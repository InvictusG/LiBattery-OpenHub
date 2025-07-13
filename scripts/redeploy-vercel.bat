@echo off
chcp 65001 > nul
echo ========================================
echo    重新部署 LiBattery OpenHub 到 Vercel
echo ========================================
echo.

echo [1/4] 检查项目构建...
npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo [2/4] 提交更改...
git add .
git commit -m "Fix Vercel deployment configuration and redeploy"

echo [3/4] 推送到GitHub...
git push origin main

echo [4/4] 触发Vercel重新部署...
echo.
echo ✅ 代码已推送到GitHub，Vercel将自动重新部署
echo.
echo 🔍 部署状态检查：
echo 1. 访问 https://vercel.com/dashboard 查看部署状态
echo 2. 确认项目设置中Framework Preset为"Next.js"
echo 3. 检查环境变量配置是否正确
echo.
echo 📋 如果仍然出现404错误，请检查：
echo - 确保Framework Preset设置为Next.js
echo - 检查Root Directory设置为空（项目根目录）
echo - 验证Build Command为"npm run build"
echo - 确认Output Directory为".next"
echo.
echo 🌐 预期部署URL: https://libattery-openhub.vercel.app
echo.

start https://vercel.com/dashboard
pause 