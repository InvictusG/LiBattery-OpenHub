@echo off
chcp 65001 > nul
echo ========================================
echo    重新创建 Vercel 项目
echo ========================================
echo.

echo 🎯 最简单的解决方案：重新从 GitHub 导入项目
echo.

echo [1/2] 确保代码已推送到 GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ⚠️ 推送可能失败，但继续执行...
)

echo [2/2] 打开 Vercel 新项目创建页面...
start https://vercel.com/new

echo.
echo 📋 操作步骤：
echo.
echo 1️⃣ 在 Vercel 页面点击 "Add New..." → "Project"
echo 2️⃣ 选择 "Import Git Repository"  
echo 3️⃣ 找到 "InvictusG/LiBattery-OpenHub" 仓库
echo 4️⃣ 点击 "Import"
echo 5️⃣ 配置项目设置：
echo    - Project Name: libattery-openhub
echo    - Framework Preset: Next.js
echo    - Root Directory: (留空)
echo    - Build Command: npm run build
echo    - Output Directory: .next
echo 6️⃣ 添加环境变量（可选）：
echo    - MONGODB_URI=你的MongoDB连接字符串
echo    - GITHUB_TOKEN=你的GitHub令牌
echo    - NEXT_PUBLIC_APP_URL=https://libattery-openhub.vercel.app
echo 7️⃣ 点击 "Deploy" 开始部署
echo.
echo ⏱️ 部署时间：通常需要 2-5 分钟
echo.
echo 🌐 部署完成后访问：
echo https://libattery-openhub.vercel.app
echo.
echo 🎉 成功后你将看到 LiBattery OpenHub 首页！
echo.

pause 