$ErrorActionPreference = "Stop"

$FrontendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $FrontendRoot

$FrontendPort = 5400
$FrontendBaseUrl = "http://127.0.0.1:$FrontendPort"
$FrontendUrl = "$FrontendBaseUrl/login"
$FallbackPort = 5401

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

Stop-PortProcess -Port $FrontendPort
Stop-PortProcess -Port $FallbackPort

$cloudflared = (Get-Command cloudflared.exe -ErrorAction SilentlyContinue).Source
$tunnelUrl = $null

if ($cloudflared) {
  $existingTunnels = Get-Process cloudflared -ErrorAction SilentlyContinue
  foreach ($existingTunnel in $existingTunnels) {
    Write-Host "Stopping existing cloudflared tunnel. PID: $($existingTunnel.Id)"
    Stop-Process -Id $existingTunnel.Id -Force
  }

  if (Test-Path ".cloudflared.err") {
    Clear-Content ".cloudflared.err"
  }
  if (Test-Path ".cloudflared.out") {
    Clear-Content ".cloudflared.out"
  }

  $tunnelProcess = Start-Process -FilePath $cloudflared `
    -ArgumentList @("tunnel", "--url", $FrontendBaseUrl) `
    -WorkingDirectory $FrontendRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput ".cloudflared.out" `
    -RedirectStandardError ".cloudflared.err" `
    -PassThru

  for ($i = 0; $i -lt 20; $i++) {
    $tunnelUrl = Get-CloudflaredUrl
    if ($tunnelUrl) {
      break
    }
    Start-Sleep -Seconds 1
  }
}

Write-Host ""
Write-Host "Frontend addresses:"
Write-Host "  -> Local:   $FrontendBaseUrl/"
if ($tunnelUrl) {
  Write-Host "              $tunnelUrl/"
}
Write-Host "  -> Login:   $FrontendUrl"
if ($tunnelUrl) {
  Write-Host "              $tunnelUrl/login"
} elseif (-not $cloudflared) {
  Write-Host "              cloudflared.exe was not found; public frontend tunnel is disabled."
} else {
  Write-Host "              Cloudflared URL was not found yet. Check frontend/.cloudflared.err."
}
Write-Host ""
Write-Host "Starting frontend dev server. Press Ctrl+C to stop."
& $npm run dev:vite
