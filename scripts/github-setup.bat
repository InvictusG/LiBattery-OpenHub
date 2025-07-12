@echo off
echo ========================================
echo    LiBattery OpenHub GitHub 设置脚本
echo ========================================
echo.

echo 📋 步骤 1: 创建 GitHub 仓库
echo.
echo 请在 GitHub 上创建新仓库:
echo 1. 访问 https://github.com/new
echo 2. 仓库名称: libattery-openhub
echo 3. 描述: 锂离子电池开源资源中心 - LiBattery OpenHub
echo 4. 选择 Public
echo 5. 不要初始化 README, .gitignore 或 license (我们已经有了)
echo 6. 点击 "Create repository"
echo.
pause

echo.
echo 🔗 步骤 2: 配置远程仓库
echo.
git remote add origin https://github.com/InvictusG/libattery-openhub.git
if %errorlevel% neq 0 (
    echo ❌ 添加远程仓库失败，可能已经存在
    git remote set-url origin https://github.com/InvictusG/libattery-openhub.git
)

echo.
echo 🌟 步骤 3: 推送代码到 GitHub
echo.
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ 推送失败，可能需要认证
    echo 请确保您已经配置了 GitHub 认证:
    echo - 使用 GitHub CLI: gh auth login
    echo - 或配置 SSH 密钥: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 成功！您的仓库已经推送到 GitHub
echo 🌐 仓库地址: https://github.com/InvictusG/libattery-openhub
echo.

echo 📋 步骤 4: 配置 GitHub Pages (可选)
echo.
echo 要启用 GitHub Pages:
echo 1. 访问 https://github.com/InvictusG/libattery-openhub/settings/pages
echo 2. Source: Deploy from a branch
echo 3. Branch: main / (root)
echo 4. 点击 Save
echo.

echo 📋 步骤 5: 配置环境变量
echo.
echo 请编辑 .env.local 文件并填入:
echo 1. MONGODB_URI=your_mongodb_connection_string
echo 2. GITHUB_TOKEN=your_github_personal_access_token
echo 3. NEXTAUTH_SECRET=your_random_secret_key
echo.
echo GitHub Token 获取地址: https://github.com/settings/tokens
echo 需要权限: public_repo, read:user, user:email
echo.

echo 🚀 步骤 6: 部署到 Vercel
echo.
echo 1. 访问 https://vercel.com/new
echo 2. 导入您的 GitHub 仓库
echo 3. 配置环境变量 (同 .env.local)
echo 4. 点击 Deploy
echo.

echo ========================================
echo    设置完成！祝您使用愉快！
echo ========================================
echo.
echo 📚 更多信息请查看:
echo - README.md
echo - SETUP_GUIDE.md
echo - DEPLOYMENT_GUIDE.md
echo.
pause 