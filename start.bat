@echo off
echo Запуск backend...
start "" cmd /k "cd /d back && truffle migrate && npm start"

timeout /t 10 /nobreak >nul

echo Запуск frontend...
start "" cmd /k "cd /d front && npm run dev"

echo Все процессы запущены!
