@echo off
chcp 65001 > nul
echo.
echo ==========================================
echo    🚀 Vercel 环境变量配置与部署脚本
echo ==========================================
echo.

:: 检查是否安装了 Vercel CLI
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Vercel CLI，正在安装...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Vercel CLI 安装失败，请手动安装: npm install -g vercel
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI 安装成功
)

echo.
echo 📋 开始配置 Vercel 环境变量...
echo.

:: 登录 Vercel（如果需要）
echo 🔐 检查 Vercel 登录状态...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 需要登录 Vercel，请按照提示操作...
    vercel login
    if %errorlevel% neq 0 (
        echo ❌ Vercel 登录失败
        pause
        exit /b 1
    )
)

echo ✅ Vercel 登录成功
echo.

:: 链接项目（如果需要）
echo 🔗 检查项目链接状态...
if not exist ".vercel" (
    echo 正在链接 Vercel 项目...
    vercel link --yes
    if %errorlevel% neq 0 (
        echo ❌ 项目链接失败
        pause
        exit /b 1
    )
    echo ✅ 项目链接成功
)

echo.
echo 🛠️ 配置环境变量...
echo.

:: 提示用户输入环境变量
echo 请输入以下环境变量（可以留空使用默认值）:
echo.

set /p MONGODB_URI="MongoDB 连接字符串 (可选): "
set /p GITHUB_TOKEN="GitHub Token (可选): "
set /p NEXTAUTH_SECRET="NextAuth Secret (可选): "

:: 如果没有输入，使用默认值或跳过
if "%MONGODB_URI%"=="" (
    echo ⚠️ 跳过 MONGODB_URI 配置（将使用演示模式）
) else (
    echo 🔧 设置 MONGODB_URI...
    vercel env add MONGODB_URI production
    echo %MONGODB_URI% | vercel env add MONGODB_URI production >nul 2>&1
)

if "%GITHUB_TOKEN%"=="" (
    echo ⚠️ 跳过 GITHUB_TOKEN 配置
) else (
    echo 🔧 设置 GITHUB_TOKEN...
    echo %GITHUB_TOKEN% | vercel env add GITHUB_TOKEN production >nul 2>&1
)

if "%NEXTAUTH_SECRET%"=="" (
    echo 🔧 生成随机 NEXTAUTH_SECRET...
    :: 生成随机字符串作为 NEXTAUTH_SECRET
    set "chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    set "secret="
    for /l %%i in (1,1,32) do call :random_char
    echo %secret% | vercel env add NEXTAUTH_SECRET production >nul 2>&1
) else (
    echo 🔧 设置 NEXTAUTH_SECRET...
    echo %NEXTAUTH_SECRET% | vercel env add NEXTAUTH_SECRET production >nul 2>&1
)

echo.
echo ✅ 环境变量配置完成！
echo.

:: 重新部署
echo 🚀 开始重新部署到 Vercel...
vercel --prod
if %errorlevel% neq 0 (
    echo ❌ 部署失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo ==========================================
echo    🎉 部署成功！
echo ==========================================
echo.
echo 📋 部署信息:
vercel ls
echo.
echo 🌐 您的网站现在已经可以访问了！
echo 💡 如果遇到问题，请检查 Vercel 控制台的日志
echo.
pause
exit /b 0

:random_char
set /a rand=%random% %% 62
for /f %%c in ('echo %chars:~%rand%,1%') do set "secret=%secret%%%c"
goto :eof 