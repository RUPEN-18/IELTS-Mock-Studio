@echo off
setlocal
set "REPO=https://github.com/RUPEN-18/IELTS-Mock-Studio.git"
cd /d "%~dp0"
echo.
echo ==============================================
echo          IELTS MOCK STUDIO - GITHUB
 echo ==============================================
echo.
echo BEFORE RUNNING: Create an EMPTY public GitHub repository:
echo   https://github.com/new
echo   Repository name: IELTS-Mock-Studio
echo   Account: RUPEN-18
echo   Do not initialise with README, licence or gitignore.
echo.
where git >nul 2>&1
if errorlevel 1 (
 echo ERROR: Git for Windows is not installed or not on PATH.
 echo Install it from https://git-scm.com/download/win
 pause
 exit /b 1
)
echo Upload to %REPO% ?
choice /C YN /N /M "Continue? [Y/N]: "
if errorlevel 2 exit /b 0
if not exist .git (
 git init
 if errorlevel 1 goto failed
)
git add .
if errorlevel 1 goto failed
git diff --cached --quiet
if errorlevel 1 (
 git commit -m "Initial IELTS Mock Studio release"
 if errorlevel 1 (
   echo If Git asks for your name/email, configure them using git config --global.
   goto failed
 )
)
git branch -M main
(git remote get-url origin >nul 2>&1) || git remote add origin %REPO%
git push -u origin main
if errorlevel 1 goto failed
echo.
echo SUCCESS: Project uploaded to https://github.com/RUPEN-18/IELTS-Mock-Studio
 echo For a live website, go to Settings ^> Pages ^> GitHub Actions.
pause
exit /b 0
:failed
echo.
echo Upload did not finish. Check the error above. No GitHub access token is needed in this script.
pause
exit /b 1
