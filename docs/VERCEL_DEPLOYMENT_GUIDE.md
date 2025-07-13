# Vercel 部署指南

## 🚀 一键部署到 Vercel

### 步骤 1: 访问 Vercel 部署页面

点击下面的按钮或访问链接：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/InvictusG/LiBattery-OpenHub)

或手动访问：https://vercel.com/new

### 步骤 2: 选择项目

1. 在 Vercel 控制台中，点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 找到并选择 `LiBattery-OpenHub` 仓库
4. 点击 "Import"

### 步骤 3: 配置项目设置

**项目配置：**
- Project Name: `libattery-openhub`
- Framework Preset: `Next.js`
- Root Directory: `./` (保持默认)
- Build and Output Settings: 保持默认

### 步骤 4: 环境变量配置

在 "Environment Variables" 部分添加以下变量：

#### 必需的环境变量：

```bash
# MongoDB 数据库连接
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-openhub

# GitHub API 令牌
GITHUB_TOKEN=ghp_your_github_personal_access_token

# 应用程序 URL (部署后获得)
NEXT_PUBLIC_APP_URL=https://libattery-openhub.vercel.app
```

#### 获取环境变量的方法：

**1. MongoDB URI:**
- 登录 [MongoDB Atlas](https://cloud.mongodb.com/)
- 创建集群或使用现有集群
- 点击 "Connect" → "Connect your application"
- 复制连接字符串并替换 `<username>` 和 `<password>`

**2. GitHub Token:**
- 访问 [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- 点击 "Generate new token (classic)"
- 选择权限：`repo`, `user:email`, `read:org`
- 复制生成的令牌

**3. App URL:**
- 初次部署时可以留空
- 部署完成后，将 Vercel 提供的 URL 更新到此变量

### 步骤 5: 部署

1. 确认所有配置正确
2. 点击 "Deploy" 按钮
3. 等待构建完成（通常需要 2-5 分钟）

### 步骤 6: 验证部署

部署完成后：

1. 访问 Vercel 提供的 URL
2. 检查首页是否正常加载
3. 测试搜索功能
4. 验证分类页面
5. 检查数据库连接状态

### 步骤 7: 更新 App URL

1. 复制 Vercel 部署的 URL
2. 在 Vercel 项目设置中更新 `NEXT_PUBLIC_APP_URL` 环境变量
3. 重新部署项目

## 🔧 高级配置

### 自定义域名

1. 在 Vercel 项目设置中，点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

### 性能优化

```json
// vercel.json 配置
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 监控和分析

1. 在 Vercel 控制台启用 Analytics
2. 配置 Error Monitoring
3. 设置 Performance Monitoring

## 🛠️ 故障排除

### 常见问题：

**1. 构建失败**
- 检查 Node.js 版本兼容性
- 确认所有依赖项已正确安装
- 查看构建日志中的错误信息

**2. 数据库连接失败**
- 验证 MongoDB URI 格式
- 检查数据库用户权限
- 确认网络访问权限

**3. GitHub API 限制**
- 检查 GitHub Token 权限
- 验证 API 速率限制
- 确认仓库访问权限

**4. 环境变量问题**
- 确认所有必需变量已设置
- 检查变量名称拼写
- 验证变量值格式

### 调试命令：

```bash
# 本地测试构建
npm run build

# 检查环境变量
npm run env:check

# 测试数据库连接
npm run test:db

# 测试 GitHub API
npm run test:github
```

## 📞 支持

如果遇到问题，请：

1. 检查 [Vercel 文档](https://vercel.com/docs)
2. 查看项目 [GitHub Issues](https://github.com/InvictusG/LiBattery-OpenHub/issues)
3. 联系项目维护者

## 🎉 部署成功！

恭喜！你的 LiBattery OpenHub 现已成功部署到 Vercel。

访问你的应用：https://libattery-openhub.vercel.app

享受你的锂离子电池开源资源中心！ 