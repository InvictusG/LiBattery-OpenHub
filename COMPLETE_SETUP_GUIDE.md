# 🚀 LiBattery OpenHub 完整设置指南

## 📋 总览

这是一个完整的步骤指南，将帮助您从零开始设置和部署 LiBattery OpenHub 项目。

## 🎯 一键快速设置

如果您想要最简单的设置方式，直接运行：

```bash
npm run quick-setup
```

这个脚本将自动完成大部分配置工作。

## 📝 手动设置步骤

### 步骤 1: 环境变量配置 ✅

1. **打开环境变量文件**
   ```bash
   notepad .env.local
   # 或使用 VS Code
   code .env.local
   ```

2. **填入必需配置**
   ```env
   # 数据库配置 (选择一个)
   MONGODB_URI=mongodb://localhost:27017/libattery-hub
   # 或 MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub
   
   # GitHub API Token (必需)
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   
   # Next.js 配置
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=libattery-openhub-secret-key-2025
   NODE_ENV=development
   ```

3. **获取 GitHub Token**
   - 访问: https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 权限选择: `public_repo`, `read:user`, `user:email`
   - 复制 token 到 `.env.local`

### 步骤 2: 创建 GitHub 仓库

**方法 A: 自动化脚本**
```bash
npm run github-setup
```

**方法 B: 手动创建**
1. 访问 https://github.com/new
2. 仓库名: `libattery-openhub`
3. 描述: `锂离子电池开源资源聚合平台`
4. 选择 Public
5. 不要初始化 README (我们已经有了)

然后运行：
```bash
git remote add origin https://github.com/InvictusG/libattery-openhub.git
git branch -M main
git push -u origin main
```

### 步骤 3: 测试本地开发环境

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问本地网站**
   ```
   http://localhost:3000
   ```

3. **验证功能**
   - ✅ 首页正常显示
   - ✅ 主题切换工作
   - ✅ 响应式设计正常

### 步骤 4: 同步初始数据

```bash
npm run sync-data
```

这将从 GitHub 获取电池相关的开源项目数据。首次运行可能需要几分钟。

### 步骤 5: 部署到 Vercel

**方法 A: 一键部署**
```bash
npm run deploy
```

**方法 B: 手动部署**
1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库: `InvictusG/libattery-openhub`
3. 配置环境变量 (与 .env.local 相同)
4. 点击 Deploy

### 步骤 6: 最终验证

1. **检查生产网站**
   - 访问 Vercel 提供的 URL
   - 测试所有功能正常

2. **同步生产数据** (可选)
   ```bash
   # 确保 MONGODB_URI 指向生产数据库
   npm run sync-data
   ```

## 🛠️ 可用的脚本命令

| 命令 | 功能 | 说明 |
|------|------|------|
| `npm run quick-setup` | 一键配置 | 自动完成所有设置步骤 |
| `npm run dev` | 开发服务器 | 启动本地开发环境 |
| `npm run build` | 构建项目 | 生产环境构建 |
| `npm run sync-data` | 数据同步 | 同步 GitHub 项目数据 |
| `npm run github-setup` | GitHub 配置 | 自动配置 GitHub 仓库 |
| `npm run deploy` | 部署项目 | 自动化部署流程 |

## 📊 数据库配置选项

### 选项 A: 本地 MongoDB (开发推荐)

1. **安装 MongoDB**
   - 下载: https://www.mongodb.com/try/download/community
   - 安装并启动服务

2. **配置连接**
   ```env
   MONGODB_URI=mongodb://localhost:27017/libattery-hub
   ```

### 选项 B: MongoDB Atlas (生产推荐)

1. **创建账户**
   - 注册: https://www.mongodb.com/atlas
   - 创建免费集群

2. **配置访问**
   - 网络访问: 添加 `0.0.0.0/0`
   - 数据库用户: 创建用户和密码

3. **获取连接字符串**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-hub
   ```

## 🔧 故障排除

### 常见问题及解决方案

#### 1. 环境变量不生效
```bash
# 重启开发服务器
Ctrl+C
npm run dev
```

#### 2. MongoDB 连接失败
```bash
# 检查 MongoDB 服务是否启动
# 验证连接字符串格式
# 确认网络访问权限
```

#### 3. GitHub API 限制
```bash
# 检查 Token 是否有效
# 确认权限设置正确
# 注意 API 速率限制
```

#### 4. 构建失败
```bash
# 检查 TypeScript 错误
npm run build
# 查看详细错误信息
```

#### 5. 部署失败
```bash
# 检查环境变量配置
# 验证 GitHub 仓库推送
# 查看 Vercel 构建日志
```

## 📚 相关文档

- **README.md** - 项目详细说明
- **ENV_CONFIG_GUIDE.md** - 环境变量配置
- **vercel-deploy-guide.md** - Vercel 部署指南
- **DEPLOYMENT_GUIDE.md** - 完整部署说明
- **SETUP_GUIDE.md** - 基础设置指南

## 🎯 快速检查清单

在开始之前，确保您有：

- [ ] Node.js 18+ 已安装
- [ ] Git 已安装并配置
- [ ] GitHub 账户: InvictusG
- [ ] MongoDB 数据库 (本地或 Atlas)
- [ ] GitHub Personal Access Token
- [ ] Vercel 账户 (用于部署)

## 🔄 定期维护

### 数据同步 (建议每天)
```bash
npm run sync-data
```

### 依赖更新 (建议每月)
```bash
npm update
npm audit fix
```

### 备份数据库 (建议每周)
```bash
# MongoDB Atlas 自动备份
# 本地 MongoDB 手动备份
mongodump --db libattery-hub
```

## 🎉 完成！

设置完成后，您将拥有：

- 🌐 **完整的网站** - 功能齐全的电池资源平台
- 📊 **实时数据** - 自动同步的 GitHub 项目
- 🚀 **生产部署** - 全球可访问的网站
- 🔧 **开发环境** - 本地开发和测试
- 📚 **完整文档** - 详细的使用指南

## 📞 获取帮助

如果遇到问题：

1. 📖 查看相关文档
2. 🔍 检查常见问题解答
3. 🐛 在 GitHub 创建 Issue
4. 💬 查看项目 Discussions

---

**🎊 恭喜！您的 LiBattery OpenHub 现已完全配置完成！** 🔋⚡

*让我们一起推动锂电池技术的开源生态发展！* 