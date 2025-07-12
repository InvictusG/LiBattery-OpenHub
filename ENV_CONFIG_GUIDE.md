# 🔧 环境变量配置指南

## 📋 必需配置

请编辑 `.env.local` 文件，添加以下配置：

### 1. 数据库配置 (必需)

```env
# 选项 A: 本地 MongoDB (开发推荐)
MONGODB_URI=mongodb://localhost:27017/libattery-hub

# 选项 B: MongoDB Atlas (生产推荐)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub?retryWrites=true&w=majority
```

### 2. GitHub API Token (必需)

```env
# 在 https://github.com/settings/tokens 创建
# 权限: public_repo, read:user, user:email
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 应用基础配置 (必需)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here
NODE_ENV=development
```

## 🚀 快速配置命令

### Windows PowerShell:
```powershell
# 1. 编辑环境变量文件
notepad .env.local

# 2. 或使用 VS Code
code .env.local
```

### 配置内容模板:
```env
# 复制以下内容到 .env.local 文件中

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/libattery-hub

# GitHub API Token (请替换为您的实际 token)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=libattery-openhub-secret-key-2025
NODE_ENV=development

# 应用配置
APP_NAME=LiBattery OpenHub
APP_DESCRIPTION=锂离子电池开源资源聚合平台
```

## 📝 获取 GitHub Token 步骤

1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 设置名称: `LiBattery-OpenHub`
4. 选择权限:
   - ✅ `public_repo` - 访问公共仓库
   - ✅ `read:user` - 读取用户信息
   - ✅ `user:email` - 读取邮箱信息
5. 点击 "Generate token"
6. 复制生成的 token 到 `.env.local` 文件

## 🗄️ 数据库配置选项

### 选项 A: 本地 MongoDB
```bash
# 1. 下载安装 MongoDB Community Server
# https://www.mongodb.com/try/download/community

# 2. 启动 MongoDB 服务
mongod --dbpath C:\data\db

# 3. 使用本地连接字符串
MONGODB_URI=mongodb://localhost:27017/libattery-hub
```

### 选项 B: MongoDB Atlas (推荐)
```bash
# 1. 注册 MongoDB Atlas: https://www.mongodb.com/atlas
# 2. 创建免费集群
# 3. 配置网络访问 (添加 0.0.0.0/0)
# 4. 创建数据库用户
# 5. 获取连接字符串
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub
```

## ✅ 配置验证

配置完成后，运行以下命令验证：

```bash
# 启动开发服务器
npm run dev

# 测试数据库连接
npm run sync-data
```

如果看到以下输出，说明配置成功：
```
✅ Connected to MongoDB
🔍 Searching for: lithium-ion battery
📊 Found XXX repositories
```

## 🚨 常见问题

### Q: MongoDB 连接失败
A: 检查 MongoDB 服务是否启动，确认连接字符串正确

### Q: GitHub API 限制
A: 确保 GitHub Token 有效，未认证请求限制为每小时 60 次

### Q: 环境变量不生效
A: 重启开发服务器 (`Ctrl+C` 然后 `npm run dev`)

---

**配置完成后，请继续下一步：创建 GitHub 仓库** 🚀 