@echo off
echo Запуск Ganache...
start "Ganache" cmd /k ganache-cli -p 7545

timeout /t 5 /nobreak >nul

echo Запуск backend...
start "Backend" cmd /k cd back && npm start

echo Запуск frontend...
start "Frontend" cmd /k cd front && npm run dev

echo Все процессы запущены!
