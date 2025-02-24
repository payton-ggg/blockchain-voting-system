@echo off
echo Запуск backend...
start "" cmd /k "cd /d back && npm start"

timeout /t 2 /nobreak >nul

echo Запуск frontend...
start "" cmd /k "cd /d front && npm run dev"

echo Все процессы запущены!
