@echo off
chcp 65001 > nul
echo ========================================
echo    LiBattery OpenHub 自动化部署脚本
echo ========================================
echo.

echo [1/5] 检查项目状态...
if not exist "package.json" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    pause
    exit /b 1
)

echo [2/5] 检查Git状态...
git status > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Git未初始化
    pause
    exit /b 1
)

echo [3/5] 提交所有更改...
git add .
git commit -m "Deploy: Update project for production deployment"

echo [4/5] 尝试推送到GitHub...
git push -u origin main 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  GitHub仓库不存在，需要手动创建
    echo.
    echo 请按照以下步骤创建GitHub仓库：
    echo 1. 访问 https://github.com/new
    echo 2. 仓库名称: libattery-openhub
    echo 3. 描述: LiBattery OpenHub - 锂离子电池开源资源中心
    echo 4. 选择 Public
    echo 5. 不要勾选任何初始化选项
    echo 6. 点击 Create repository
    echo.
    echo 创建完成后，运行以下命令：
    echo git remote add origin https://github.com/InvictusG/libattery-openhub.git
    echo git push -u origin main
    echo.
    start https://github.com/new
    pause
    exit /b 1
) else (
    echo ✅ 代码已成功推送到GitHub
)

echo [5/5] 准备Vercel部署...
echo.
echo 🚀 GitHub仓库已准备就绪！
echo 📝 接下来请访问 https://vercel.com/new
echo 📋 选择从GitHub导入项目: libattery-openhub
echo ⚙️  环境变量配置:
echo    - MONGODB_URI: 你的MongoDB连接字符串
echo    - GITHUB_TOKEN: 你的GitHub个人访问令牌
echo    - NEXT_PUBLIC_APP_URL: https://your-app.vercel.app
echo.
echo 🎉 部署完成后，你的应用将在Vercel上运行！
echo.

start https://vercel.com/new
pause 