$ErrorActionPreference = "Stop"

$FrontendRoot = Split-Path -Parent $PSScriptRoot
Set-Location $FrontendRoot

$npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
if (-not $npm) {
  throw "npm.cmd was not found in PATH."
}

Write-Host "Starting frontend at http://localhost:5400/login"
& $npm run dev

