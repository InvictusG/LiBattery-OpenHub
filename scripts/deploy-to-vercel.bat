@echo off
chcp 65001 > nul
echo ========================================
echo    部署 LiBattery OpenHub 到 Vercel
echo ========================================
echo.

echo ✅ GitHub 仓库已就绪
echo 📋 仓库地址: https://github.com/InvictusG/LiBattery-OpenHub
echo.

echo 🚀 正在打开 Vercel 部署页面...
echo.
echo 📝 请按照以下步骤操作：
echo.
echo 1. 在 Vercel 控制台中选择 "Add New Project"
echo 2. 选择 "Import Git Repository"
echo 3. 找到并选择 "LiBattery-OpenHub" 仓库
echo 4. 配置环境变量：
echo    - MONGODB_URI: 你的 MongoDB 连接字符串
echo    - GITHUB_TOKEN: 你的 GitHub 个人访问令牌
echo    - NEXT_PUBLIC_APP_URL: https://your-app.vercel.app
echo 5. 点击 "Deploy" 开始部署
echo.
echo 📖 详细部署指南请查看: docs/VERCEL_DEPLOYMENT_GUIDE.md
echo.

echo 正在打开 Vercel 部署页面...
start https://vercel.com/new/clone?repository-url=https://github.com/InvictusG/LiBattery-OpenHub

echo.
echo 🎉 部署完成后，你的应用将在 Vercel 上运行！
echo.
pause 