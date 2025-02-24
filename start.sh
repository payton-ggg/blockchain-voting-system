echo "Запустіть Ganache..."

sleep 10

echo "Запуск backend..."
cd backend
npm start &

cd ..
echo "Запуск frontend..."
cd frontend
npm start &

wait
