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

function Stop-PortProcess {
  param(
    [int]$Port
  )

  $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  $processIds = $connections |
    Select-Object -ExpandProperty OwningProcess -Unique |
    Where-Object { $_ -and $_ -ne $PID }

  foreach ($processId in $processIds) {
    try {
      $process = Get-Process -Id $processId -ErrorAction Stop
      Write-Host "Port $Port is occupied by PID $processId ($($process.ProcessName)). Stopping it..."
      Stop-Process -Id $processId -Force
    } catch {
      Write-Host "Failed to stop PID $processId on port $Port. $_"
      throw
    }
  }

  for ($i = 0; $i -lt 10; $i++) {
    $remaining = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if (-not $remaining) {
      return
    }
    Start-Sleep -Seconds 1
  }

  $remainingPids = (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique) -join ", "
  throw "Port $Port is still occupied by PID(s): $remainingPids"
}

$npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
if (-not $npm) {
  throw "npm.cmd was not found in PATH."
}

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created backend/.env from backend/.env.example"
}

$existingApi = $false
try {
  $health = Invoke-RestMethod $apiHealth -TimeoutSec 2
  $existingApi = [bool]$health.ok
} catch {
  $existingApi = $false
}

if ($existingApi) {
  Write-Host "Existing API detected at $apiHealth. It will be restarted by this script."
}
Stop-PortProcess -Port $ApiPort

Write-Host "Preparing database..."
& $npm run db:generate
& $npm run db:migrate
& $npm run db:seed
& $npm run db:check

Write-Host ""
Write-Host "Backend local service:"
Write-Host "  API base URL: $ApiBaseUrl"
Write-Host "  Health check: $apiHealth"
Write-Host "  Example API : $apiExample"
Write-Host ""

if ($SkipTunnel) {
  Write-Host "Cloudflared tunnel skipped."
} else {
  $cloudflared = (Get-Command cloudflared.exe -ErrorAction SilentlyContinue).Source
  if (-not $cloudflared) {
    Write-Host "cloudflared.exe was not found. API will run locally only."
  } else {
    $existingTunnels = Get-Process cloudflared -ErrorAction SilentlyContinue
    foreach ($existingTunnel in $existingTunnels) {
      Write-Host "Stopping existing cloudflared tunnel. PID: $($existingTunnel.Id)"
      Stop-Process -Id $existingTunnel.Id -Force
    }

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
  }
}

Write-Host ""
Write-Host "Starting API dev server in this terminal. Press Ctrl+C to stop."
& $npm run dev
