# 🚀 Vercel 部署指南

## 📋 部署前准备

确保您已完成：
- ✅ 项目代码已推送到 GitHub
- ✅ 本地测试运行正常
- ✅ 环境变量配置完成

## 🌐 一键部署到 Vercel

### 方法 1: 快速部署按钮

点击下面的按钮一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FInvictusG%2Flibattery-openhub&env=MONGODB_URI,GITHUB_TOKEN,NEXTAUTH_SECRET&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2FInvictusG%2Flibattery-openhub%2Fblob%2Fmain%2FENV_CONFIG_GUIDE.md)

### 方法 2: 手动部署

1. **访问 Vercel Dashboard**
   ```
   https://vercel.com/new
   ```

2. **导入 Git 仓库**
   - 点击 "Import Git Repository"
   - 选择 GitHub
   - 找到 `InvictusG/libattery-openhub`
   - 点击 "Import"

3. **配置项目设置**
   - Project Name: `libattery-openhub`
   - Framework Preset: `Next.js`
   - Root Directory: `./` (默认)

## 🔧 环境变量配置

在 Vercel 部署页面的 "Environment Variables" 部分添加：

### 必需变量:

```env
# 数据库连接 (推荐使用 MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub

# GitHub API Token
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.js 认证密钥
NEXTAUTH_SECRET=your-random-secret-key-here

# 应用 URL (Vercel 会自动设置)
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### 可选变量:

```env
# 应用配置
APP_NAME=LiBattery OpenHub
APP_DESCRIPTION=锂离子电池开源资源聚合平台
NODE_ENV=production

# 功能开关
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=false
```

## 📊 MongoDB Atlas 配置

### 1. 创建 MongoDB Atlas 账户
```
https://www.mongodb.com/atlas/database
```

### 2. 创建集群
- 选择 "Shared" (免费)
- 选择云提供商和区域
- 集群名称: `libattery-cluster`

### 3. 配置网络访问
- Database Access > Network Access
- 添加 IP 地址: `0.0.0.0/0` (允许所有IP)
- 或添加 Vercel 的 IP 范围

### 4. 创建数据库用户
- Database Access > Database Users
- 用户名: `libattery-user`
- 密码: 生成强密码
- 权限: `Read and write to any database`

### 5. 获取连接字符串
- Clusters > Connect > Connect your application
- 复制连接字符串
- 替换 `<password>` 为实际密码

## 🔗 自定义域名 (可选)

### 1. 在 Vercel 项目设置中
- 进入项目 > Settings > Domains
- 添加自定义域名: `libattery-hub.com`

### 2. 配置 DNS
在您的域名提供商处添加：
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

## 🔄 自动部署设置

Vercel 会自动设置：
- ✅ Git 集成 - 推送代码自动部署
- ✅ 预览部署 - PR 自动生成预览
- ✅ 生产部署 - main 分支自动部署

## 📈 部署后验证

### 1. 检查部署状态
- 访问 Vercel Dashboard
- 查看部署日志
- 确认构建成功

### 2. 测试网站功能
```bash
# 访问您的网站
https://your-app-name.vercel.app

# 测试 API 端点
https://your-app-name.vercel.app/api/repositories

# 检查数据库连接
查看网站首页是否正常显示
```

### 3. 同步初始数据
```bash
# 在本地运行数据同步 (推送到生产数据库)
MONGODB_URI=your-production-mongodb-uri npm run sync-data
```

## 🔧 部署脚本

创建自动化部署脚本：

```bash
# scripts/deploy.bat
@echo off
echo 🚀 开始部署到 Vercel...

echo 📝 检查代码状态...
git status

echo 📤 推送最新代码...
git add .
git commit -m "Deploy: Update for production"
git push origin main

echo 🌐 部署将自动开始...
echo 访问 Vercel Dashboard 查看部署状态
start https://vercel.com/dashboard

echo ✅ 部署命令已执行完成！
pause
```

## 🔍 故障排除

### 常见问题:

#### 1. 构建失败
```bash
# 检查本地构建
npm run build

# 查看 Vercel 构建日志
# Functions > View Function Logs
```

#### 2. 环境变量问题
```bash
# 确认所有必需变量已设置
# Settings > Environment Variables
```

#### 3. 数据库连接失败
```bash
# 检查 MongoDB Atlas 网络设置
# 确认连接字符串正确
# 测试本地连接
```

#### 4. API 路由错误
```bash
# 检查 /api/repositories 端点
# 查看 Function Logs
# 确认 GitHub Token 有效
```

## 📊 性能优化

### 1. 启用分析
```env
ENABLE_ANALYTICS=true
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. 配置缓存
```env
CACHE_TTL=3600
REDIS_URL=redis://your-redis-url
```

### 3. CDN 优化
Vercel 自动提供：
- ✅ 全球 CDN
- ✅ 自动图片优化
- ✅ 代码分割

## 🎉 部署完成

部署成功后，您将拥有：

- 🌐 **生产网站**: `https://your-app.vercel.app`
- 📊 **实时分析**: Vercel Analytics
- 🔄 **自动部署**: Git 推送自动更新
- 🌍 **全球 CDN**: 快速访问
- 📱 **移动优化**: 响应式设计

## 📞 获取帮助

如遇问题，请查看：
- 📚 [Vercel 文档](https://vercel.com/docs)
- 🐛 [GitHub Issues](https://github.com/InvictusG/libattery-openhub/issues)
- 💬 [Vercel 社区](https://github.com/vercel/vercel/discussions)

---

**🎊 恭喜！您的 LiBattery OpenHub 现已部署到全球！** 🔋⚡ 