@echo off
echo ========================================================
echo [디버깅 모드] 뉴 라이프 앱 실행 테스트
echo ========================================================
echo.

echo 1. 현재 경로 확인:
echo %~dp0
cd /d "%~dp0"
echo.

echo 2. Node.js 버전 확인:
node -v
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되지 않았거나 경로를 찾을 수 없습니다.
    echo Node.js를 설치해주세요: https://nodejs.org/
    pause
    exit /b
)
echo.

echo 3. npm 버전 확인:
call npm -v
if %errorlevel% neq 0 (
    echo [오류] npm을 실행할 수 없습니다.
    pause
    exit /b
)
echo.

echo 4. 의존성(node_modules) 확인:
if not exist "node_modules" (
    echo [알림] node_modules 폴더가 없습니다. 설치를 시작합니다...
    call npm install
    if %errorlevel% neq 0 (
        echo [오류] npm install 실패.
        pause
        exit /b
    )
) else (
    echo [확인] node_modules 폴더가 존재합니다.
)
echo.

echo 5. 개발 서버 실행 시도...
echo (잠시 후 브라우저가 열려야 합니다. 창을 닫지 마세요!)
echo.

start http://localhost:3000
call npm run dev

pause
