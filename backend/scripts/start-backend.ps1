param(
  [switch]$SkipTunnel
)

$ErrorActionPreference = "Stop"

$BackendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $BackendRoot

$npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
if (-not $npm) {
  throw "npm.cmd was not found in PATH."
}

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created backend/.env from backend/.env.example"
}

Write-Host "Preparing database..."
& $npm run db:generate
& $npm run db:migrate
& $npm run db:seed
& $npm run db:check

$apiHealth = "http://localhost:3000/health"
$apiRunning = $false
try {
  $health = Invoke-RestMethod $apiHealth -TimeoutSec 2
  $apiRunning = [bool]$health.ok
} catch {
  $apiRunning = $false
}

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

if ($SkipTunnel) {
  Write-Host "Cloudflared tunnel skipped."
  exit 0
}

$cloudflared = (Get-Command cloudflared.exe -ErrorAction SilentlyContinue).Source
if (-not $cloudflared) {
  Write-Host "cloudflared.exe was not found. API is running locally only."
  exit 0
}

Write-Host "Starting cloudflared tunnel for API..."
$tunnelProcess = Start-Process -FilePath $cloudflared `
  -ArgumentList @("tunnel", "--url", "http://localhost:3000") `
  -WorkingDirectory $BackendRoot `
  -WindowStyle Hidden `
  -RedirectStandardOutput ".cloudflared.out" `
  -RedirectStandardError ".cloudflared.err" `
  -PassThru

Write-Host "Cloudflared started. PID: $($tunnelProcess.Id)"
Write-Host "Check backend/.cloudflared.err for the trycloudflare.com URL."

