@echo off
echo 🚀 Starting Ad Campaign Builder...
echo.

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✨ Both servers are starting!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window (servers will keep running)...
pause >nul
