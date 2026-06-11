param(
  [switch]$SkipTunnel
)

$ErrorActionPreference = "Stop"

$BackendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $BackendRoot

$ApiPort = 3000
$ApiBaseUrl = "http://localhost:$ApiPort"
$apiHealth = "$ApiBaseUrl/health"
$apiExample = "$ApiBaseUrl/api/families/family-lin/stats"

function Get-CloudflaredUrl {
  if (-not (Test-Path ".cloudflared.err")) {
    return $null
  }

  $match = Select-String -Path ".cloudflared.err" -Pattern "https://[a-zA-Z0-9-]+\.trycloudflare\.com" | Select-Object -Last 1
  if (-not $match) {
    return $null
  }

  return $match.Matches[0].Value
}

$npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
if (-not $npm) {
  throw "npm.cmd was not found in PATH."
}

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created backend/.env from backend/.env.example"
}

$apiRunning = $false
try {
  $health = Invoke-RestMethod $apiHealth -TimeoutSec 2
  $apiRunning = [bool]$health.ok
} catch {
  $apiRunning = $false
}

Write-Host "Preparing database..."
if ($apiRunning) {
  Write-Host "API is already running, skipping Prisma generate to avoid locked engine files."
} else {
  & $npm run db:generate
}
& $npm run db:migrate
& $npm run db:seed
& $npm run db:check

if ($apiRunning) {
  Write-Host "API is already running at $apiHealth"
} else {
  Write-Host "Starting API dev server..."
  $apiProcess = Start-Process -FilePath $npm `
    -ArgumentList @("run", "dev") `
    -WorkingDirectory $BackendRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput ".api.out" `
    -RedirectStandardError ".api.err" `
    -PassThru

  for ($i = 0; $i -lt 20; $i++) {
    try {
      $health = Invoke-RestMethod $apiHealth -TimeoutSec 2
      if ($health.ok) {
        $apiRunning = $true
        break
      }
    } catch {
      Start-Sleep -Seconds 1
    }
  }

  if (-not $apiRunning) {
    throw "API did not become healthy. Check backend/.api.err and backend/.api.out."
  }

  Write-Host "API started. PID: $($apiProcess.Id)"
}

Write-Host ""
Write-Host "Backend local service:"
Write-Host "  API base URL: $ApiBaseUrl"
Write-Host "  Health check: $apiHealth"
Write-Host "  Example API : $apiExample"
Write-Host ""

if ($SkipTunnel) {
  Write-Host "Cloudflared tunnel skipped."
  exit 0
}

$cloudflared = (Get-Command cloudflared.exe -ErrorAction SilentlyContinue).Source
if (-not $cloudflared) {
  Write-Host "cloudflared.exe was not found. API is running locally only."
  exit 0
}

$existingTunnel = Get-Process cloudflared -ErrorAction SilentlyContinue | Select-Object -First 1
if ($existingTunnel) {
  Write-Host "Cloudflared is already running. PID: $($existingTunnel.Id)"
} else {
  Write-Host "Starting cloudflared tunnel for API..."
  if (Test-Path ".cloudflared.err") {
    Clear-Content ".cloudflared.err"
  }
  if (Test-Path ".cloudflared.out") {
    Clear-Content ".cloudflared.out"
  }

  $tunnelProcess = Start-Process -FilePath $cloudflared `
    -ArgumentList @("tunnel", "--url", $ApiBaseUrl) `
    -WorkingDirectory $BackendRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput ".cloudflared.out" `
    -RedirectStandardError ".cloudflared.err" `
    -PassThru

  Write-Host "Cloudflared started. PID: $($tunnelProcess.Id)"
}

$tunnelUrl = $null
for ($i = 0; $i -lt 20; $i++) {
  $tunnelUrl = Get-CloudflaredUrl
  if ($tunnelUrl) {
    break
  }
  Start-Sleep -Seconds 1
}

if ($tunnelUrl) {
  Write-Host ""
  Write-Host "Backend tunnel service:"
  Write-Host "  Tunnel base URL: $tunnelUrl"
  Write-Host "  Tunnel example : $tunnelUrl/api/families/family-lin/stats"
} else {
  Write-Host "Cloudflared URL was not found yet. Check backend/.cloudflared.err."
}
