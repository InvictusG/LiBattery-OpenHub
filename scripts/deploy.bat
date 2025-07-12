@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    🚀 LiBattery OpenHub 部署脚本
echo ========================================
echo.

echo 📝 检查项目状态...
echo.

echo ✅ 检查 Git 状态...
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git 仓库未初始化
    echo 请先运行: npm run github-setup
    pause
    exit /b 1
)

echo ✅ 检查项目构建...
npm run build >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 项目构建失败
    echo 请检查代码和环境变量配置
    pause
    exit /b 1
)

echo ✅ 项目状态检查完成
echo.

echo ========================================
echo    📤 推送代码到 GitHub
echo ========================================
echo.

echo 📋 当前文件状态:
git status --short

echo.
set /p commit_msg="请输入提交信息 (默认: Deploy to production): "
if "%commit_msg%"=="" set commit_msg=Deploy to production

echo.
echo 📦 添加文件到 Git...
git add .

echo 💾 创建提交...
git commit -m "%commit_msg%"

echo 📤 推送到 GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查 GitHub 认证
    echo 建议运行: gh auth login
    pause
    exit /b 1
)

echo ✅ 代码已成功推送到 GitHub
echo.

echo ========================================
echo    🌐 Vercel 部署
echo ========================================
echo.

echo 🔗 GitHub 仓库: https://github.com/InvictusG/libattery-openhub
echo.

set /p deploy_vercel="是否要打开 Vercel 部署页面? (y/n): "
if /i "%deploy_vercel%"=="y" (
    echo.
    echo 🌐 正在打开 Vercel 部署页面...
    start https://vercel.com/new/clone?repository-url=https://github.com/InvictusG/libattery-openhub
    
    echo.
    echo 📋 部署步骤提醒:
    echo 1. 在 Vercel 页面点击 "Deploy"
    echo 2. 配置环境变量:
    echo    - MONGODB_URI
    echo    - GITHUB_TOKEN  
    echo    - NEXTAUTH_SECRET
    echo 3. 等待部署完成
    echo.
)

echo ========================================
echo    📊 部署后验证
echo ========================================
echo.

echo 🔍 请在部署完成后验证以下功能:
echo.
echo ✅ 网站首页正常显示
echo ✅ 分类页面可以访问
echo ✅ 搜索功能正常工作
echo ✅ API 端点响应正常
echo ✅ 数据库连接成功
echo.

set /p sync_prod_data="部署完成后是否要同步生产数据? (y/n): "
if /i "%sync_prod_data%"=="y" (
    echo.
    echo 📊 同步生产环境数据...
    echo.
    echo ⚠️  请确保您的 .env.local 中的 MONGODB_URI 指向生产数据库
    echo.
    set /p confirm_sync="确认同步到生产数据库? (y/n): "
    if /i "%confirm_sync%"=="y" (
        npm run sync-data
        if %errorlevel% neq 0 (
            echo ❌ 数据同步失败
        ) else (
            echo ✅ 生产数据同步完成
        )
    )
)

echo.
echo ========================================
echo    🎉 部署完成！
echo ========================================
echo.

echo ✅ 部署流程已完成！
echo.
echo 📋 后续操作:
echo 1. 🌐 访问您的生产网站
echo 2. 📊 查看 Vercel Dashboard 监控
echo 3. 🔄 设置自动化数据同步 (可选)
echo 4. 🔗 配置自定义域名 (可选)
echo.
echo 📚 相关文档:
echo - vercel-deploy-guide.md - 详细部署指南
echo - DEPLOYMENT_GUIDE.md - 部署说明
echo - README.md - 项目文档
echo.
echo 🔋 祝您的 LiBattery OpenHub 运行顺利！
echo.
pause 