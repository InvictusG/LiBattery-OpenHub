@echo off
chcp 65001 >nul
echo 🔋 LiBattery OpenHub 项目设置开始...
echo.

:: 检查 Node.js 版本
echo 📦 检查 Node.js 版本...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18.0 或更高版本
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=." %%i in ('node -v') do set node_major=%%i
set node_major=%node_major:~1%
if %node_major% lss 18 (
    echo ❌ Node.js 版本过低，需要 18.0 或更高版本
    node -v
    pause
    exit /b 1
)

echo ✅ Node.js 版本符合要求
node -v

:: 检查包管理器
echo.
echo 📦 检查包管理器...
npm -v >nul 2>&1
if %errorlevel% equ 0 (
    set PACKAGE_MANAGER=npm
    echo ✅ 使用 npm
) else (
    yarn -v >nul 2>&1
    if %errorlevel% equ 0 (
        set PACKAGE_MANAGER=yarn
        echo ✅ 使用 yarn
    ) else (
        echo ❌ 未找到 npm 或 yarn
        pause
        exit /b 1
    )
)

:: 安装依赖
echo.
echo 📦 安装项目依赖...
if "%PACKAGE_MANAGER%"=="npm" (
    npm install
) else (
    yarn install
)

if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo ✅ 依赖安装完成

:: 创建环境变量文件
echo.
echo ⚙️ 配置环境变量...
if not exist .env.local (
    copy env.example .env.local >nul
    echo ✅ 已创建 .env.local 文件
    echo ⚠️ 请编辑 .env.local 文件，填入正确的环境变量：
    echo    - MONGODB_URI: MongoDB 连接字符串
    echo    - GITHUB_TOKEN: GitHub Personal Access Token
    echo    - JWT_SECRET: JWT 密钥
) else (
    echo ✅ .env.local 文件已存在
)

:: 提示用户配置环境变量
echo.
echo 📝 配置指南：
echo    1. MONGODB_URI: 访问 https://www.mongodb.com/cloud/atlas 创建免费数据库
echo    2. GITHUB_TOKEN: 访问 https://github.com/settings/tokens 创建 Personal Access Token
echo    3. JWT_SECRET: 生成一个随机字符串作为 JWT 密钥
echo.
echo 🎉 设置完成！
echo.
echo 📚 更多信息请查看 README.md
echo 🌐 项目地址: http://localhost:3000
echo 📖 API 文档: http://localhost:3000/api
echo.
echo 配置完环境变量后，运行以下命令启动项目：
if "%PACKAGE_MANAGER%"=="npm" (
    echo    npm run dev
) else (
    echo    yarn dev
)
echo.
echo 或者运行数据同步脚本：
if "%PACKAGE_MANAGER%"=="npm" (
    echo    npm run data-sync
) else (
    echo    yarn data-sync
)
echo.
pause 