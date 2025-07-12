#!/bin/bash

# LiBattery OpenHub 项目设置脚本
echo "🔋 LiBattery OpenHub 项目设置开始..."

# 检查 Node.js 版本
echo "📦 检查 Node.js 版本..."
node_version=$(node -v 2>/dev/null || echo "未安装")
if [[ $node_version == "未安装" ]]; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18.0 或更高版本"
    exit 1
fi

# 检查版本是否符合要求
major_version=$(echo $node_version | cut -d'.' -f1 | cut -d'v' -f2)
if [[ $major_version -lt 18 ]]; then
    echo "❌ Node.js 版本过低，当前版本: $node_version，需要 18.0 或更高版本"
    exit 1
fi

echo "✅ Node.js 版本符合要求: $node_version"

# 检查包管理器
echo "📦 检查包管理器..."
if command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    echo "✅ 使用 npm"
elif command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    echo "✅ 使用 yarn"
else
    echo "❌ 未找到 npm 或 yarn"
    exit 1
fi

# 安装依赖
echo "📦 安装项目依赖..."
if [[ $PACKAGE_MANAGER == "npm" ]]; then
    npm install
else
    yarn install
fi

if [[ $? -ne 0 ]]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 创建环境变量文件
echo "⚙️  配置环境变量..."
if [[ ! -f .env.local ]]; then
    cp env.example .env.local
    echo "✅ 已创建 .env.local 文件"
    echo "⚠️  请编辑 .env.local 文件，填入正确的环境变量："
    echo "   - MONGODB_URI: MongoDB 连接字符串"
    echo "   - GITHUB_TOKEN: GitHub Personal Access Token"
    echo "   - JWT_SECRET: JWT 密钥"
else
    echo "✅ .env.local 文件已存在"
fi

# 检查环境变量
echo "🔍 检查环境变量配置..."
source .env.local 2>/dev/null || true

missing_vars=()
if [[ -z "$MONGODB_URI" || "$MONGODB_URI" == "mongodb+srv://username:password@cluster.mongodb.net/libattery-openhub?retryWrites=true&w=majority" ]]; then
    missing_vars+=("MONGODB_URI")
fi

if [[ -z "$GITHUB_TOKEN" || "$GITHUB_TOKEN" == "your_github_personal_access_token_here" ]]; then
    missing_vars+=("GITHUB_TOKEN")
fi

if [[ -z "$JWT_SECRET" || "$JWT_SECRET" == "your_jwt_secret_key_here" ]]; then
    missing_vars+=("JWT_SECRET")
fi

if [[ ${#missing_vars[@]} -gt 0 ]]; then
    echo "⚠️  以下环境变量需要配置："
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "📝 配置指南："
    echo "   1. MONGODB_URI: 访问 https://www.mongodb.com/cloud/atlas 创建免费数据库"
    echo "   2. GITHUB_TOKEN: 访问 https://github.com/settings/tokens 创建 Personal Access Token"
    echo "   3. JWT_SECRET: 生成一个随机字符串作为 JWT 密钥"
    echo ""
    echo "配置完成后，运行以下命令启动项目："
    echo "   $PACKAGE_MANAGER run dev"
else
    echo "✅ 环境变量配置完成"
    
    # 启动开发服务器
    echo "🚀 启动开发服务器..."
    if [[ $PACKAGE_MANAGER == "npm" ]]; then
        npm run dev
    else
        yarn dev
    fi
fi

echo ""
echo "🎉 设置完成！"
echo "📚 更多信息请查看 README.md"
echo "🌐 项目地址: http://localhost:3000"
echo "📖 API 文档: http://localhost:3000/api" 