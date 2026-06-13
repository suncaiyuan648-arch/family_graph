$ErrorActionPreference = "Stop"

$BackendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $BackendRoot

$ApiPort = 3000
$ApiBaseUrl = "http://localhost:$ApiPort"
$apiHealth = "$ApiBaseUrl/health"
$apiExample = "$ApiBaseUrl/api/families/family-lin/stats"

function Stop-PortProcess {
  param(
    [int]$Port
  )

  function Get-RelatedProcessIds {
    param(
      [int]$ProcessId
    )

    $relatedIds = New-Object System.Collections.Generic.List[int]
    $currentId = $ProcessId

    for ($i = 0; $i -lt 8; $i++) {
      $processInfo = Get-WmiObject Win32_Process -Filter "ProcessId = $currentId" -ErrorAction SilentlyContinue
      if (-not $processInfo -or $currentId -eq $PID) {
        break
      }

      $commandLine = [string]$processInfo.CommandLine
      $isBackendDevProcess = $commandLine -match "src/server\.ts|tsx watch src/server\.ts|npm.*dev:backend|start-backend\.ps1"
      if ($currentId -ne $ProcessId -and -not $isBackendDevProcess) {
        break
      }

      $relatedIds.Add($currentId)
      $currentId = [int]$processInfo.ParentProcessId
      if (-not $currentId) {
        break
      }
    }

    $relatedIdArray = $relatedIds.ToArray()
    [array]::Reverse($relatedIdArray)
    return $relatedIdArray
  }

  $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  $processIds = $connections |
    Select-Object -ExpandProperty OwningProcess -Unique |
    Where-Object { $_ -and $_ -ne $PID }

  foreach ($processId in $processIds) {
    $relatedIds = Get-RelatedProcessIds -ProcessId $processId
    foreach ($relatedId in $relatedIds) {
      try {
        $process = Get-Process -Id $relatedId -ErrorAction Stop
        Write-Host "Port $Port is occupied by PID $processId. Stopping related PID $relatedId ($($process.ProcessName))..."
        Stop-Process -Id $relatedId -Force
      } catch {
        Write-Host "Failed to stop related PID $relatedId for port $Port. $_"
        throw
      }
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
Write-Host "  Public tunnel: disabled for backend"

Write-Host ""
Write-Host "Starting API dev server in this terminal. Press Ctrl+C to stop."
& $npm run dev
