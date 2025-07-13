@echo off
chcp 65001 > nul
echo ========================================
echo    强制部署 LiBattery OpenHub 到 Vercel
echo ========================================
echo.

echo [步骤 1] 检查GitHub连接...
git remote -v
echo.

echo [步骤 2] 检查当前分支...
git branch
echo.

echo [步骤 3] 确保所有文件已提交...
git status
echo.

echo [步骤 4] 创建部署触发提交...
echo # Deployment trigger > deployment-trigger.txt
git add .
git commit -m "Trigger Vercel deployment - Force deploy"
echo.

echo [步骤 5] 推送到GitHub触发部署...
git push origin main
echo.

echo ========================================
echo    部署已触发！
echo ========================================
echo.
echo 🔍 现在请执行以下步骤：
echo.
echo 1. 访问 Vercel Dashboard: https://vercel.com/dashboard
echo 2. 找到项目 'libattery-openhub' 
echo 3. 点击项目进入详情页面
echo 4. 检查 Deployments 标签页
echo 5. 应该能看到新的部署正在进行
echo.
echo 💡 如果仍然没有部署，请：
echo 1. 点击 "Deployments" 标签
echo 2. 点击 "Redeploy" 按钮
echo 3. 选择 "Use existing Build Cache: No"
echo 4. 点击 "Redeploy" 确认
echo.
echo 🌐 预期部署URL: https://libattery-openhub.vercel.app
echo.

start https://vercel.com/dashboard
pause 