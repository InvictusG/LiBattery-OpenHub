# LiBattery OpenHub 部署指南

## 🚀 快速开始

### 自动化设置（推荐）

**Windows 用户：**
```bash
# 双击运行或在命令行中执行
scripts/setup.bat
```

**Linux/macOS 用户：**
```bash
# 给脚本添加执行权限
chmod +x scripts/setup.sh

# 运行设置脚本
./scripts/setup.sh
```

### 手动设置

1. **环境要求**
   - Node.js 18.0+
   - npm 或 yarn
   - MongoDB 数据库
   - GitHub Personal Access Token

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **环境配置**
   ```bash
   # 复制环境变量模板
   cp env.example .env.local
   
   # 编辑环境变量
   nano .env.local
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

## 🔧 环境变量配置

### MongoDB Atlas 设置

1. **创建账户**
   - 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - 注册免费账户

2. **创建集群**
   - 选择 "Build a Database"
   - 选择 "Shared" (免费)
   - 选择云提供商和区域
   - 创建集群

3. **配置访问**
   - 创建数据库用户
   - 添加 IP 地址到白名单（0.0.0.0/0 允许所有）
   - 获取连接字符串

4. **连接字符串格式**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/libattery-openhub?retryWrites=true&w=majority
   ```

### GitHub Token 获取

1. **创建 Token**
   - 访问 [GitHub Settings](https://github.com/settings/tokens)
   - 点击 "Generate new token" > "Generate new token (classic)"
   - 设置 Token 名称：`LiBattery-OpenHub`
   - 选择权限：
     - `public_repo` - 访问公共仓库
     - `read:org` - 读取组织信息
   - 点击 "Generate token"

2. **保存 Token**
   - 复制生成的 token
   - 添加到 `.env.local` 文件中

### JWT 密钥生成

```bash
# 使用 Node.js 生成随机密钥
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 或者使用在线生成器
# https://www.uuidgenerator.net/
```

## 🌐 Vercel 部署

### 1. 准备工作

确保项目已推送到 GitHub 仓库：

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 部署到 Vercel

1. **连接 GitHub**
   - 访问 [Vercel](https://vercel.com)
   - 使用 GitHub 账户登录
   - 点击 "New Project"
   - 选择 LiBattery OpenHub 仓库

2. **配置项目**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **设置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   MONGODB_URI=your_mongodb_connection_string
   GITHUB_TOKEN=your_github_token
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 访问生成的 URL

### 3. 自动部署

设置完成后，每次推送到 main 分支都会自动触发部署。

## 📊 数据同步

### 手动同步

```bash
# 运行数据同步脚本
npm run data-sync

# 或者
node scripts/sync-github-data.js
```

### 自动同步

可以设置定时任务来自动同步数据：

**Linux/macOS (crontab):**
```bash
# 每天凌晨 2 点同步
0 2 * * * cd /path/to/project && npm run data-sync
```

**Windows (任务计划程序):**
1. 打开任务计划程序
2. 创建基本任务
3. 设置触发器（每天）
4. 设置操作（启动程序）
5. 程序：`node`
6. 参数：`scripts/sync-github-data.js`
7. 起始位置：项目根目录

### Vercel Cron Jobs

在 `vercel.json` 中配置：

```json
{
  "crons": [
    {
      "path": "/api/sync",
      "schedule": "0 2 * * *"
    }
  ]
}
```

## 🔍 故障排除

### 常见问题

1. **Node.js 版本过低**
   ```bash
   # 升级 Node.js
   # 访问 https://nodejs.org/ 下载最新版本
   ```

2. **MongoDB 连接失败**
   - 检查连接字符串格式
   - 确认用户名和密码正确
   - 检查 IP 白名单设置

3. **GitHub API 限制**
   - 检查 Token 是否有效
   - 确认 Token 权限设置
   - 注意 API 调用频率限制

4. **构建失败**
   ```bash
   # 清理缓存
   npm run build
   
   # 或者
   rm -rf .next
   npm run build
   ```

### 日志查看

**开发环境：**
```bash
npm run dev
# 查看控制台输出
```

**生产环境（Vercel）：**
- 访问 Vercel Dashboard
- 选择项目
- 查看 Functions 日志

## 📈 性能优化

### 1. 数据库优化

```javascript
// 创建索引
db.repositories.createIndex({ "name": "text", "description": "text" })
db.repositories.createIndex({ "category": 1 })
db.repositories.createIndex({ "stargazers_count": -1 })
```

### 2. 缓存策略

```javascript
// 在 API 路由中添加缓存头
export async function GET(request) {
  const response = NextResponse.json(data)
  response.headers.set('Cache-Control', 'public, max-age=3600')
  return response
}
```

### 3. 图片优化

```javascript
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src={avatar_url}
  alt="Avatar"
  width={40}
  height={40}
  className="rounded-full"
/>
```

## 🔒 安全配置

### 1. 环境变量安全

- 永远不要在代码中硬编码敏感信息
- 使用 `.env.local` 文件存储本地环境变量
- 在 Vercel 中设置生产环境变量

### 2. API 安全

```javascript
// 添加 CORS 头
export async function GET(request) {
  const response = NextResponse.json(data)
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}
```

### 3. 数据验证

```javascript
// 验证输入参数
const { searchParams } = new URL(request.url)
const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
```

## 📝 维护指南

### 1. 定期更新

```bash
# 更新依赖
npm update

# 检查安全漏洞
npm audit
npm audit fix
```

### 2. 数据备份

```bash
# MongoDB 备份
mongodump --uri="your_mongodb_uri" --out=backup/
```

### 3. 监控

- 使用 Vercel Analytics 监控性能
- 设置 Uptime 监控
- 配置错误报告（如 Sentry）

## 📞 支持

如果遇到问题，请：

1. 查看 [GitHub Issues](https://github.com/your-username/libattery-openhub/issues)
2. 创建新的 Issue 描述问题
3. 提供详细的错误信息和环境信息

---

祝您部署成功！🎉 