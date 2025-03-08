@echo off
echo Start backend...
start "" cmd /k "cd /d back && truffle migrate && npm start"

timeout /t 10 /nobreak >nul

echo Start frontend...
start "" cmd /k "cd /d front && npm run dev"

echo Everything was launched!
