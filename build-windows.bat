@echo off
REM Build script for Eye Tracking Controller Windows Executable
REM This script builds the application and prepares it for distribution

echo ================================================
echo Eye Tracking Controller - Windows Build Script
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed
    echo.
)

REM Clean previous builds
echo Cleaning previous builds...
if exist "dist" rmdir /s /q dist
echo Clean complete
echo.

REM Build 64-bit version
echo Building Windows 64-bit executable...
call npm run package-win
if %ERRORLEVEL% NEQ 0 (
    echo Build failed
    pause
    exit /b 1
)
echo Build complete
echo.

REM Copy distribution README
echo Copying distribution README...
copy DISTRIBUTION-README.txt dist\Eyetrack-win32-x64\README.txt >nul
echo README copied
echo.

echo ================================================
echo BUILD SUCCESSFUL!
echo ================================================
echo.
echo Output location: dist\Eyetrack-win32-x64\
echo Executable: Eyetrack.exe
echo.
echo To distribute:
echo   1. Create a ZIP file of the entire dist\Eyetrack-win32-x64\ folder
echo   2. Share the ZIP with users
echo   3. Users extract and run Eyetrack.exe
echo.
echo You can now compress the folder using Windows Explorer:
echo   Right-click on dist\Eyetrack-win32-x64
echo   Select "Send to" -^> "Compressed (zipped) folder"
echo.
pause
