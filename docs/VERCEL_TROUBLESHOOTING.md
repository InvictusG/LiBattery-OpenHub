# Vercel 部署故障排除指南

## 🚨 常见的 404 错误解决方案

### 1. 检查 Framework Preset 设置

**这是最常见的问题！**

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目 `LiBattery-OpenHub`
3. 进入 **Settings** → **Build & Development Settings**
4. 确保 **Framework Preset** 设置为 **Next.js**
5. 如果不是，请修改并重新部署

### 2. 验证项目配置

确保以下设置正确：

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
Root Directory: (留空，表示项目根目录)
```

### 3. 检查 vercel.json 配置

我们的 `vercel.json` 应该包含：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### 4. 环境变量配置

确保在 Vercel 项目设置中配置了以下环境变量：

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-openhub
GITHUB_TOKEN=ghp_your_github_personal_access_token
NEXT_PUBLIC_APP_URL=https://libattery-openhub.vercel.app
```

## 🔧 分步故障排除

### 步骤 1: 检查部署状态

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 查看最新部署是否成功
3. 检查构建日志是否有错误

### 步骤 2: 验证域名配置

1. 在项目设置中检查域名配置
2. 确保域名状态为 "Valid Configuration"
3. 如果有问题，删除并重新添加域名

### 步骤 3: 检查部署输出

1. 在部署详情页面，查看 **Source** 和 **Output** 标签
2. 确保输出目录包含必要的文件：
   - `_next/` 目录
   - `index.html` 或相应的页面文件
   - API 路由文件

### 步骤 4: 测试特定页面

访问以下URL测试不同页面：

- 首页: `https://your-app.vercel.app/`
- 测试页面: `https://your-app.vercel.app/test`
- API 端点: `https://your-app.vercel.app/api/repositories`

## 🛠️ 高级故障排除

### 问题：页面刷新后出现 404

**解决方案：** 确保 `vercel.json` 包含正确的重写规则：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### 问题：API 路由返回 404

**解决方案：** 检查 API 文件位置和命名：

- 文件应位于 `src/app/api/` 目录
- 文件名必须是 `route.ts` 或 `route.js`
- 确保导出了正确的 HTTP 方法函数

### 问题：静态资源无法加载

**解决方案：** 检查 `next.config.js` 中的图片和资源配置：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
```

## 🚀 快速修复脚本

运行以下脚本自动修复常见问题：

```bash
# 1. 重新构建项目
npm run build

# 2. 检查构建输出
ls -la .next/

# 3. 提交更改
git add .
git commit -m "Fix Vercel deployment configuration"

# 4. 推送到GitHub
git push origin main
```

## 📞 获取帮助

如果问题仍然存在，请：

1. 检查 [Vercel 状态页面](https://www.vercel-status.com/)
2. 查看 [Vercel 社区论坛](https://community.vercel.com/)
3. 联系 Vercel 支持团队

## 🔍 调试工具

### 本地测试生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 访问 http://localhost:3000 测试
```

### 检查 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 本地测试部署
vercel dev

# 查看部署日志
vercel logs
```

## ✅ 成功部署检查清单

- [ ] Framework Preset 设置为 Next.js
- [ ] 构建命令正确
- [ ] 环境变量已配置
- [ ] vercel.json 配置正确
- [ ] 域名配置有效
- [ ] 部署状态为成功
- [ ] 所有页面可正常访问

---

**最后更新:** 2024年12月19日  
**版本:** v1.0.0  
**状态:** 故障排除指南 🔧 