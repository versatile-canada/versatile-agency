@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM  Versatile Agency — Update Website
REM  Drag and drop a new .zip export onto this file to update
REM  your local project files and preview the changes.
REM
REM  If Windows shows a "publisher could not be verified" warning
REM  first, see the "Unblock the .bat files" step in
REM  README-DEPLOY.md — that one-time step prevents Windows from
REM  losing the file you dragged when you click "Run".
REM ============================================================

cd /d "%~dp0"

set "ZIPFILE=%~1"

if "%ZIPFILE%"=="" (
    echo.
    echo No file was attached to this run — either you double-clicked
    echo apply-update.bat directly, or Windows' security prompt dropped
    echo the file you dragged onto it ^(this happens with unblocked
    echo downloads — see README-DEPLOY.md^).
    echo.
    echo Opening a file picker instead so you can select the .zip...
    echo.
    for /f "usebackq delims=" %%F in (`powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object System.Windows.Forms.OpenFileDialog; $f.Filter = 'Zip files (*.zip)|*.zip'; $f.Title = 'Select the versatile-agency update zip'; if ($f.ShowDialog() -eq 'OK') { Write-Output $f.FileName }"`) do set "ZIPFILE=%%F"
)

if "%ZIPFILE%"=="" (
    echo.
    echo No file selected. Nothing was changed.
    echo.
    pause
    exit /b
)

if /I not "!ZIPFILE:~-4!"==".zip" (
    echo.
    echo That doesn't look like a .zip file: %ZIPFILE%
    echo Please select a .zip export.
    echo.
    pause
    exit /b
)

echo.
echo ==========================================
echo  Versatile Agency — Website Updater
echo ==========================================
echo.
echo Update file : %ZIPFILE%
echo Project dir : %cd%
echo.

set "TEMPDIR=%TEMP%\versatile-update-%RANDOM%"
set "PSSCRIPT=%TEMP%\versatile-update-%RANDOM%.ps1"

mkdir "%TEMPDIR%" >nul 2>&1

echo Extracting update...
> "%PSSCRIPT%" echo $ErrorActionPreference = 'Stop'
>> "%PSSCRIPT%" echo Expand-Archive -LiteralPath '%ZIPFILE%' -DestinationPath '%TEMPDIR%' -Force
powershell -NoProfile -ExecutionPolicy Bypass -File "%PSSCRIPT%"

if errorlevel 1 (
    echo.
    echo Failed to extract the zip file. Nothing was changed.
    del "%PSSCRIPT%" >nul 2>&1
    pause
    exit /b
)

echo Copying files into the project...
> "%PSSCRIPT%" echo $ErrorActionPreference = 'Stop'
>> "%PSSCRIPT%" echo $items = Get-ChildItem -LiteralPath '%TEMPDIR%'
>> "%PSSCRIPT%" echo if ^($items.Count -eq 1 -and $items[0].PSIsContainer^) { $src = $items[0].FullName } else { $src = '%TEMPDIR%' }
>> "%PSSCRIPT%" echo Copy-Item -Path (Join-Path $src '*') -Destination '%cd%' -Recurse -Force -Exclude 'node_modules'
powershell -NoProfile -ExecutionPolicy Bypass -File "%PSSCRIPT%"

if errorlevel 1 (
    echo.
    echo Failed to copy the update files. Nothing may have changed.
    del "%PSSCRIPT%" >nul 2>&1
    rmdir /s /q "%TEMPDIR%" >nul 2>&1
    pause
    exit /b
)

echo Cleaning up temp files...
del "%PSSCRIPT%" >nul 2>&1
rmdir /s /q "%TEMPDIR%" >nul 2>&1

echo.
echo Files updated successfully.
echo.

where npm >nul 2>&1
if errorlevel 1 (
    echo npm was not found on this computer, so dependencies and the
    echo dev server can't be started automatically. Install Node.js
    echo from https://nodejs.org ^(LTS version^), then re-run this file,
    echo or run "npm install" and "npm run dev" manually.
    echo.
    pause
    exit /b
)

echo Installing/refreshing dependencies (this may take a minute)...
call npm install

echo.
echo Starting the local dev server in a new window...
start "Versatile Agency - Dev Server" cmd /k "npm run dev"

echo Waiting for the server to boot...
timeout /t 5 /nobreak >nul

start "" http://localhost:5174

echo.
echo Done. The site should now be open at http://localhost:5174
echo (Leave the dev server window open while you preview the site.)
echo.
pause
