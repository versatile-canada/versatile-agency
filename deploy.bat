@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM  Versatile Agency — Deploy to GitHub Pages
REM  Double-click this file to push your current project files
REM  to GitHub. GitHub Actions then builds and publishes the site
REM  automatically — no separate hosting service needed.
REM ============================================================

cd /d "%~dp0"

echo.
echo ==========================================
echo  Versatile Agency — Deploy
echo ==========================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo Git is not installed or not on your PATH.
    echo Install it from https://git-scm.com/download/win and try again.
    echo.
    pause
    exit /b
)

if not exist ".git" (
    echo No git repository found in this folder yet.
    echo.
    echo Follow the one-time setup steps in README-DEPLOY.md first,
    echo then run deploy.bat again.
    echo.
    pause
    exit /b
)

set /p COMMITMSG=Describe this update (press Enter to use a default message):
if "%COMMITMSG%"=="" set "COMMITMSG=Update website files"

echo.
echo Staging changes...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes detected — nothing to deploy.
    echo.
    pause
    exit /b
)

echo Committing: "%COMMITMSG%"
git commit -m "%COMMITMSG%"

echo.
echo Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo Push failed. Common causes:
    echo   - You haven't finished the one-time setup in README-DEPLOY.md
    echo   - Your GitHub credentials / access token have expired
    echo   - Someone else pushed changes — try: git pull origin main
    echo.
    pause
    exit /b
)

echo.
echo ==========================================================================
echo Pushed! GitHub is now rebuilding your site automatically.
echo Watch it build here:
echo   https://github.com/versatile-canada/versatile-agency/actions
echo.
echo Once you see a green checkmark, your changes are live at:
echo   https://versatile-canada.github.io/versatile-agency/
echo   Hard refresh with Ctrl+Shift+R if your browser shows an old version.
echo.
echo (If your repo name/org is different, update these two URLs inside
echo  deploy.bat to match, and the base path in vite.config.js.)
echo ==========================================================================
echo.
pause
