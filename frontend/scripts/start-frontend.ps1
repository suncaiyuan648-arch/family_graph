$ErrorActionPreference = "Stop"

$FrontendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $FrontendRoot

$FrontendPort = 5400
$FrontendUrl = "http://localhost:$FrontendPort/login"

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

Write-Host "Starting frontend at $FrontendUrl"
& $npm run dev
