# LiBattery OpenHub 设置指南

## 🚀 快速开始

### 1. 环境配置

复制环境配置模板：
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，填入以下配置：

```env
# MongoDB 数据库配置
MONGODB_URI=mongodb://localhost:27017/libattery-hub
# 或使用 MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub

# GitHub API Token (必需)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Next.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. GitHub Token 获取步骤

1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 设置 Token 名称：`LiBattery-OpenHub`
4. 选择权限：
   - ✅ `public_repo` - 访问公共仓库
   - ✅ `read:user` - 读取用户信息
   - ✅ `user:email` - 读取邮箱信息
5. 点击 "Generate token"
6. 复制生成的 token 到 `.env.local` 文件

### 3. 数据库选择

#### 选项 A: 本地 MongoDB (开发推荐)
```bash
# 安装 MongoDB Community Server
# Windows: https://www.mongodb.com/try/download/community
# 启动 MongoDB 服务
mongod --dbpath C:\data\db
```

#### 选项 B: MongoDB Atlas (生产推荐)
1. 注册 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 创建免费集群
3. 配置网络访问 (添加 0.0.0.0/0 或您的 IP)
4. 创建数据库用户
5. 获取连接字符串

### 4. 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 同步 GitHub 数据 (首次运行)
npm run sync-data
```

### 5. 验证安装

访问 http://localhost:3000 确认项目正常运行

## 📊 数据同步

### 首次数据同步
```bash
node scripts/sync-github-data.js
```

### 定期数据更新 (建议每天运行)
```bash
# 设置 cron job 或 Windows 任务计划
# 0 2 * * * cd /path/to/project && node scripts/sync-github-data.js
```

## 🚀 部署到 Vercel

### 1. GitHub 仓库设置

```bash
# 添加远程仓库
git remote add origin https://github.com/InvictusG/libattery-openhub.git

# 推送代码
git branch -M main
git push -u origin main
```

### 2. Vercel 部署

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 配置环境变量：
   - `MONGODB_URI`
   - `GITHUB_TOKEN`
   - `NEXTAUTH_SECRET`
5. 点击 "Deploy"

### 3. 自定义域名 (可选)

在 Vercel 项目设置中添加您的自定义域名。

## 🔧 开发工具

### 推荐的 VS Code 扩展
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter

### 代码格式化
```bash
# 格式化代码
npm run format

# 检查代码质量
npm run lint
```

## 📝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 🐛 常见问题

### Q: MongoDB 连接失败
A: 检查 MongoDB 服务是否启动，确认连接字符串正确

### Q: GitHub API 限制
A: 确保使用了有效的 GitHub Token，未认证请求限制为每小时 60 次

### Q: 构建失败
A: 检查 Node.js 版本 (需要 18+)，清除缓存后重新安装依赖

### Q: 样式不显示
A: 确认 Tailwind CSS 配置正确，重启开发服务器

## 📞 支持

如有问题，请在 GitHub Issues 中反馈或联系维护者。

---

**🎉 祝您使用愉快！让我们一起建设更好的锂电池开源生态！** 