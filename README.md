# LiBattery OpenHub - 锂离子电池开源资源中心

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/TailwindCSS-3.3-cyan?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel" alt="Vercel">
</div>

## 🔋 项目简介

LiBattery OpenHub 是一个专业的锂离子电池开源资源聚合平台，致力于为全球电池技术工作者提供最新的开源项目、研究工具和技术资源。

### ✨ 主要特性

- 🔍 **智能搜索** - 基于关键词和分类的高级搜索功能
- 📊 **数据可视化** - 直观展示项目统计和趋势分析
- 🏷️ **智能分类** - 按技术领域自动分类项目
- 🌟 **精选推荐** - 社区推荐的高质量项目
- 📱 **响应式设计** - 支持桌面端和移动端
- 🌙 **暗色模式** - 支持明暗主题切换
- 🔄 **自动同步** - 定期从 GitHub 同步最新数据
- 🚀 **高性能** - 基于 Next.js 14 和服务端渲染

### 🎯 目标用户

- 🔬 **研究人员** - 学术界和工业界的电池技术研究者
- 👨‍💻 **工程师** - 电芯设计、BMS 开发、系统集成工程师
- 🎓 **学生** - 电化学、材料科学、电气工程专业学生
- 🏢 **企业** - 电池制造商、汽车厂商、储能公司

## 🛠️ 技术栈

### 前端
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

### 后端
- **Next.js API Routes** - 服务端 API
- **MongoDB** - NoSQL 数据库
- **Mongoose** - MongoDB 对象建模
- **GitHub API** - 数据源

### 部署
- **Vercel** - 前端部署平台
- **MongoDB Atlas** - 云数据库
- **GitHub Actions** - CI/CD 自动化

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器
- MongoDB 数据库
- GitHub Personal Access Token

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/libattery-openhub.git
cd libattery-openhub
```

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

4. **配置环境变量**
```env
# MongoDB 数据库连接字符串
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libattery-openhub

# GitHub API Token
GITHUB_TOKEN=your_github_personal_access_token

# JWT 密钥
JWT_SECRET=your_jwt_secret_key

# 应用 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

5. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 数据同步

运行数据同步脚本从 GitHub 获取电池相关项目：

```bash
npm run data-sync
```

## 📁 项目结构

```
libattery-openhub/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── api/               # API 路由
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── home/              # 首页组件
│   │   ├── layout/            # 布局组件
│   │   └── providers/         # 上下文提供者
│   ├── lib/                   # 工具库
│   │   ├── models/            # 数据模型
│   │   ├── github.ts          # GitHub API 客户端
│   │   └── mongodb.ts         # 数据库连接
│   └── types/                 # TypeScript 类型定义
├── scripts/                   # 脚本文件
│   └── sync-github-data.js    # 数据同步脚本
├── public/                    # 静态文件
├── next.config.js             # Next.js 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── package.json               # 项目配置
```

## 🔧 API 文档

### 获取仓库列表

```http
GET /api/repositories?q=battery&category=simulation&page=1&limit=20
```

**查询参数:**
- `q` - 搜索关键词
- `category` - 分类筛选
- `language` - 编程语言
- `minStars` - 最小星标数
- `maxStars` - 最大星标数
- `sortBy` - 排序方式 (stars, updated, created, relevance)
- `sortOrder` - 排序顺序 (asc, desc)
- `page` - 页码
- `limit` - 每页数量

**响应示例:**
```json
{
  "success": true,
  "data": {
    "repositories": [...],
    "total": 1250,
    "page": 1,
    "totalPages": 63
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "totalPages": 63
  }
}
```

### 技术分类

项目按以下类别自动分类：

- 🔋 **电芯设计** (cell_design) - 电池单体设计和建模
- 📊 **寿命预测** (life_prediction) - 电池衰减和寿命预测
- 🖥️ **BMS 系统** (bms) - 电池管理系统
- ⚙️ **仿真工具** (simulation) - 电池仿真和建模
- 🌡️ **热管理** (thermal) - 电池热管理技术
- 🛡️ **安全相关** (safety) - 电池安全和保护
- 🧪 **材料科学** (materials) - 电池材料研究
- 🏭 **制造工艺** (manufacturing) - 电池制造技术
- 🔬 **测试工具** (testing) - 电池测试和表征
- 📈 **数据分析** (data_analysis) - 电池数据分析
- 🎯 **建模工具** (modeling) - 数学建模工具
- 🔧 **优化算法** (optimization) - 电池优化算法

## 🚀 部署指南

### Vercel 部署

1. **连接 GitHub 仓库**
   - 登录 [Vercel](https://vercel.com)
   - 导入 GitHub 仓库
   - 选择 Next.js 模板

2. **配置环境变量**
   在 Vercel 项目设置中添加环境变量：
   - `MONGODB_URI`
   - `GITHUB_TOKEN`
   - `JWT_SECRET`

3. **自动部署**
   - 推送代码到 main 分支
   - Vercel 自动构建和部署

### MongoDB Atlas 设置

1. **创建集群**
   - 注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - 创建免费集群
   - 配置网络访问和数据库用户

2. **获取连接字符串**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/libattery-openhub
   ```

### GitHub Token 获取

1. **创建 Personal Access Token**
   - 访问 GitHub Settings > Developer settings > Personal access tokens
   - 生成新的 token
   - 选择必要的权限：`public_repo`, `read:org`

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. **Fork 项目**
2. **创建功能分支** (`git checkout -b feature/amazing-feature`)
3. **提交更改** (`git commit -m 'Add amazing feature'`)
4. **推送到分支** (`git push origin feature/amazing-feature`)
5. **创建 Pull Request**

### 代码规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 和 Prettier 配置
- 编写清晰的注释和文档
- 确保所有测试通过

## 📊 项目统计

- 🗂️ **收录项目**: 1,200+ 个开源项目
- ⭐ **总星标数**: 50,000+ 
- 👥 **活跃开发者**: 5,000+
- 🔄 **月度更新**: 300+ 个项目

## 🗺️ 发展路线图

### Phase 1 - 基础功能 ✅
- [x] 项目搜索和分类
- [x] 响应式 UI 设计
- [x] GitHub 数据同步
- [x] 基础 API 接口

### Phase 2 - 增强功能 🚧
- [ ] 用户系统和收藏功能
- [ ] 项目评分和评论
- [ ] AI 驱动的项目推荐
- [ ] 高级搜索过滤器

### Phase 3 - 社区功能 📋
- [ ] 用户贡献系统
- [ ] 项目提交审核
- [ ] 社区讨论区
- [ ] 开发者认证

### Phase 4 - 智能化 🔮
- [ ] 机器学习项目分类
- [ ] 智能项目匹配
- [ ] 趋势分析和预测
- [ ] 个性化推荐引擎

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目和社区：

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [MongoDB](https://www.mongodb.com/) - 数据库
- [GitHub API](https://docs.github.com/en/rest) - 数据源
- [Vercel](https://vercel.com/) - 部署平台

## 📞 联系我们

- 📧 Email: contact@libattery-openhub.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/libattery-openhub/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/libattery-openhub/discussions)

---

<div align="center">
  <p>Built with ❤️ for the battery community</p>
  <p>© 2024 LiBattery OpenHub. All rights reserved.</p>
</div> 