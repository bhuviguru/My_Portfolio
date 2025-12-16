# Startup Script for Portfolio App
Write-Host "Starting MongoDB..."
$mongoProcess = Start-Process -FilePath "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" -ArgumentList "--dbpath C:\Users\bhuva\Downloads\Portfolio\mongo_data" -PassThru -WindowStyle Hidden

Write-Host "Waiting for DB to warm up..."
Start-Sleep -Seconds 5

Write-Host "Starting Backend Server..."
Set-Location "backend"
npm run dev
