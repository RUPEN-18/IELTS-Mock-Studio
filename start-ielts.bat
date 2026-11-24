@echo off
setlocal
cd /d "%~dp0"
echo Opening IELTS Mock Studio on http://localhost:8000
start "" "http://localhost:8000"
where py >nul 2>&1
if not errorlevel 1 (
  py -m http.server 8000
) else (
  python -m http.server 8000
)
echo.
echo If the server did not start, install Python or open index.html directly.
pause
