@echo off
echo 🚀 Setting up Ad Campaign Builder...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

node --version
echo.

REM Setup backend
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating backend .env file...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env and add your API keys
)
echo.

REM Setup frontend
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

cd ..

echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env and add your BLACKBOX_API_KEY
echo 2. Start the backend: cd backend ^&^& npm start
echo 3. Start the frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173 in your browser
echo.
pause
