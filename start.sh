#!/bin/bash

echo "🚀 Starting Ad Campaign Builder..."
echo ""

# Check if backend/.env exists
if [ ! -f backend/.env ]; then
    echo "⚠️  Warning: backend/.env not found!"
    echo "Please create it from backend/.env.example and add your API keys"
    exit 1
fi

# Start backend in background
echo "Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✨ Both servers are running!"
echo ""
echo "Backend: http://localhost:3001 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
