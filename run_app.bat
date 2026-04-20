@echo off
cd /d "%~dp0"

:: 5초 대기 (서버 시작 시간 확보)
ping 127.0.0.1 -n 6 > nul
start http://localhost:3000

:: 서버 실행
npm run dev
