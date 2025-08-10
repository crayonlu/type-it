# Type-it(Readme By AI)

> 一个基于 Next.js 15 的现代化个人网站项目，采用最新的 React 19 和 TypeScript 技术栈构建

## 🚀 项目特性

- **现代化架构** - Next.js 15 + React 19 + TypeScript
- **国际化支持** - 内置中英文双语切换
- **响应式设计** - 移动端优先，完美适配各种设备
- **主题切换** - 支持亮色/暗色主题自由切换
- **博客系统** - 基于 Markdown 的文章管理
- **项目展示** - 个人作品集展示
- **性能优化** - Turbopack 加速开发，优化构建体验

## 🛠️ 技术栈

### 核心框架
- **Next.js** 15.4.3 (App Router)
- **React** 19.1.0
- **TypeScript** 5.x

### UI & 样式
- **Tailwind CSS** 4.x
- **shadcn/ui** 组件库
- **Lucide React** 图标库
- **GSAP** 动画库

### 开发工具
- **Bun** 包管理器
- **ESLint** 代码规范
- **Turbopack** 开发服务器

## 📦 快速开始

### 环境要求
- Node.js 18+
- Bun (推荐) 或 npm/yarn

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/crayonlu/type-it.git
cd type-it

# 安装依赖
bun install

# 启动开发服务器
bun dev

# 构建生产版本
bun build

# 启动生产服务器
bun start
```

## 📁 项目结构

```
src/
├── app/                    # Next.js 路由页面
│   ├── page.tsx           # 首页
│   ├── about/             # 关于页面
│   ├── blog/              # 博客功能
│   └── projects/          # 项目展示
├── components/            # 可复用组件
│   ├── ui/               # 基础 UI 组件
│   ├── header/           # 导航栏组件
│   ├── home/             # 首页组件
│   └── theme/            # 主题切换组件
├── config/               # 配置文件
│   ├── docs/             # 内容文档
│   ├── home.ts           # 首页配置
│   └── header.ts         # 导航配置
├── lib/                  # 工具函数
├── types/                # 类型定义
└── i18n/                 # 国际化配置
```

## ✨ 核心功能

### 🏠 个人主页
- 个人介绍展示
- 头像和昵称配置
- 动态加载多语言内容

### 📝 博客系统
- Markdown 文章渲染
- 分类和标签管理
- 阅读进度显示
- 文章导航功能

### 💼 项目展示
- 项目作品集展示
- 技术栈标签
- 项目详情页面

### 🌐 国际化
- 中英文双语支持
- 动态语言切换
- 多语言内容管理

## 🎨 设计系统

### 主题配色
- **浅色主题**: 简洁明亮的白色基调
- **深色主题**: 优雅的深色调设计
- **主色调**: 现代化的蓝紫色系

### 响应式设计
- 移动端优先设计理念
- 流畅的动画过渡效果
- 无障碍访问支持

## 🔧 配置说明

### 个人信息配置
在 `src/config/home.ts` 中修改：
```typescript
export const avatar = 'your-avatar-url';
export const nickname = 'your-name';
```

### 导航菜单配置
在 `src/config/header.ts` 中自定义导航项

### 内容管理
- 博客文章：`src/config/docs/Blog/`
- 项目介绍：`src/config/docs/Project/`
- 个人介绍：`src/config/docs/Home/`

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

*Built with ❤️ by [Crayon](https://github.com/crayonlu)*