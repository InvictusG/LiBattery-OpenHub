@echo off
chcp 65001 > nul
echo ========================================
echo    一键修复 Vercel 部署问题
echo ========================================
echo.

echo 🔍 问题诊断：
echo - Vercel 项目已创建但没有部署
echo - 需要连接 GitHub 仓库并触发首次部署
echo.

echo [1/3] 推送代码到 GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查网络连接
    pause
    exit /b 1
)

echo [2/3] 打开 Vercel 控制台...
start https://vercel.com/invictusg/libattery-openhub

echo [3/3] 手动操作指南：
echo.
echo 🎯 在 Vercel 控制台中执行以下操作：
echo.
echo 1️⃣ 点击 "Settings" 设置
echo 2️⃣ 选择 "Git" 标签
echo 3️⃣ 点击 "Connect Git Repository"
echo 4️⃣ 选择 GitHub 并连接 "LiBattery-OpenHub" 仓库
echo 5️⃣ 点击 "Deploy" 开始首次部署
echo.
echo 📋 重要配置检查：
echo ✅ Framework Preset: Next.js
echo ✅ Build Command: npm run build  
echo ✅ Output Directory: .next
echo ✅ Root Directory: (留空)
echo.
echo 🌐 部署完成后访问：
echo https://libattery-openhub.vercel.app
echo.

echo 💡 如果上述步骤不起作用，请执行：
echo 1. 删除当前 Vercel 项目
echo 2. 重新从 GitHub 导入项目
echo 3. 选择正确的仓库 "LiBattery-OpenHub"
echo.

pause 