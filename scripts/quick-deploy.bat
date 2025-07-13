@echo off
chcp 65001 > nul
echo.
echo ==========================================
echo    🚀 LiBattery OpenHub 快速部署
echo ==========================================
echo.

:: 检查是否安装了 Vercel CLI
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 安装 Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ 安装失败，请手动运行: npm install -g vercel
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI 已就绪
echo.

:: 构建项目
echo 🔨 构建项目...
npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo ✅ 构建成功
echo.

:: 部署到 Vercel
echo 🚀 部署到 Vercel...
echo.
echo 💡 提示：
echo   - 如果是首次部署，请按照提示登录 Vercel
echo   - 选择 "Link to existing project" 或 "Create new project"
echo   - 项目名称建议使用: libattery-openhub
echo   - 选择 "Deploy" 完成部署
echo.

vercel --prod
if %errorlevel% neq 0 (
    echo ❌ 部署失败
    echo.
    echo 🔧 常见解决方案：
    echo   1. 确保已登录 Vercel: vercel login
    echo   2. 检查项目链接: vercel link
    echo   3. 手动部署: vercel --prod
    echo.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo    🎉 部署成功！
echo ==========================================
echo.

:: 显示部署信息
echo 📋 项目信息：
vercel ls | findstr libattery

echo.
echo ✅ 您的 LiBattery OpenHub 现在已经在线了！
echo 🌐 访问您的网站查看部署结果
echo.
echo 📝 后续步骤：
echo   1. 在 Vercel 控制台配置环境变量（如需要）
echo   2. 绑定自定义域名（可选）
echo   3. 配置 MongoDB 数据库（可选）
echo.
pause 