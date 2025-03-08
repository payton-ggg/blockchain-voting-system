@echo off
echo Install dep. backend...
start "" cmd /k "cd /d back && npm install"

timeout /t 10 /nobreak >nul

echo Install dep. frontend...
start "" cmd /k "cd /d front && npm install"

echo Everything was Installed!
