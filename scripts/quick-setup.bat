@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    🚀 LiBattery OpenHub 一键配置脚本
echo ========================================
echo.

echo 📋 步骤 1: 检查项目环境
echo.
echo ✅ 检查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未找到 Node.js，请先安装 Node.js 18+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

echo ✅ 检查 Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未找到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git 已安装

echo ✅ 检查项目依赖...
if not exist "node_modules" (
    echo 📦 安装项目依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)
echo ✅ 项目依赖已就绪

echo.
echo ========================================
echo    🔧 步骤 2: 配置环境变量
echo ========================================
echo.

if not exist ".env.local" (
    echo 📋 创建环境变量文件...
    copy env.example .env.local >nul
    echo ✅ 已创建 .env.local 文件
) else (
    echo ✅ .env.local 文件已存在
)

echo.
echo 🔑 请配置以下环境变量:
echo.
echo 1. 📝 编辑 .env.local 文件
echo    推荐使用: code .env.local 或 notepad .env.local
echo.
echo 2. 🔧 必需配置项:
echo    - MONGODB_URI: MongoDB 连接字符串
echo    - GITHUB_TOKEN: GitHub Personal Access Token
echo    - NEXTAUTH_SECRET: 随机密钥
echo.
echo 📚 详细配置指南请查看: ENV_CONFIG_GUIDE.md
echo.

set /p continue="是否已完成环境变量配置? (y/n): "
if /i not "%continue%"=="y" (
    echo.
    echo 📝 正在打开配置文件...
    start notepad .env.local
    echo.
    echo 请按照 ENV_CONFIG_GUIDE.md 完成配置后重新运行此脚本
    pause
    exit /b 0
)

echo.
echo ========================================
echo    🧪 步骤 3: 测试项目运行
echo ========================================
echo.

echo 🔨 构建项目...
npm run build
if %errorlevel% neq 0 (
    echo ❌ 项目构建失败，请检查环境变量配置
    pause
    exit /b 1
)
echo ✅ 项目构建成功

echo.
echo 🚀 启动开发服务器...
echo.
echo 📍 服务器地址: http://localhost:3000
echo 📍 按 Ctrl+C 停止服务器
echo.
start http://localhost:3000
npm run dev &

echo.
echo ========================================
echo    🐙 步骤 4: GitHub 仓库配置
echo ========================================
echo.

set /p setup_github="是否要配置 GitHub 仓库? (y/n): "
if /i "%setup_github%"=="y" (
    echo.
    echo 🔗 配置 GitHub 仓库...
    call scripts\github-setup.bat
)

echo.
echo ========================================
echo    📊 步骤 5: 数据同步
echo ========================================
echo.

set /p sync_data="是否要同步初始数据? (y/n): "
if /i "%sync_data%"=="y" (
    echo.
    echo 📡 开始同步 GitHub 数据...
    echo 这可能需要几分钟时间...
    npm run sync-data
    if %errorlevel% neq 0 (
        echo ⚠️ 数据同步失败，请检查网络连接和 GitHub Token
    ) else (
        echo ✅ 数据同步完成
    )
)

echo.
echo ========================================
echo    🌐 步骤 6: Vercel 部署指南
echo ========================================
echo.

echo 🚀 要部署到 Vercel，请按照以下步骤:
echo.
echo 1. 访问 https://vercel.com/new
echo 2. 选择 "Import Git Repository"
echo 3. 连接您的 GitHub 账户
echo 4. 选择 libattery-openhub 仓库
echo 5. 配置环境变量 (与 .env.local 相同)
echo 6. 点击 Deploy
echo.
echo 📚 详细部署指南: DEPLOYMENT_GUIDE.md
echo.

set /p open_vercel="是否要打开 Vercel 部署页面? (y/n): "
if /i "%open_vercel%"=="y" (
    start https://vercel.com/new
)

echo.
echo ========================================
echo    🎉 配置完成！
echo ========================================
echo.

echo ✅ 项目已完全配置完成！
echo.
echo 📋 下一步操作:
echo 1. 🌐 访问 http://localhost:3000 查看本地项目
echo 2. 📊 运行 npm run sync-data 同步更多数据
echo 3. 🚀 部署到 Vercel 让全世界访问
echo 4. 📚 查看文档了解更多功能
echo.
echo 📞 如有问题，请查看:
echo - README.md - 项目说明
echo - SETUP_GUIDE.md - 详细设置指南
echo - ENV_CONFIG_GUIDE.md - 环境变量配置
echo - DEPLOYMENT_GUIDE.md - 部署指南
echo.
echo 🔋 祝您使用愉快！让我们一起推动锂电池技术发展！
echo.
pause 