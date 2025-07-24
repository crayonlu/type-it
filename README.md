# Type-It

## 项目概述

**Type-It** 是一个基于 Next.js 15.4.3 的现代化 Web 应用程序，使用 TypeScript 开发，采用 App Router 架构。

## 技术栈

### 核心框架
- **Next.js**: 15.4.3 (使用 App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x

### 样式和UI
- **Tailwind CSS**: 4.x (最新版本)
- **shadcn/ui**: 使用 New York 风格
- **Lucide React**: 图标库
- **tw-animate-css**: 动画库

### 开发工具
- **ESLint**: 代码质量检查
- **Turbopack**: 快速开发服务器
- **Bun**: 包管理器

## 项目结构

```
type-it/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── globals.css        # 全局样式
│   │   ├── about/             # 关于页面
│   │   ├── blog/              # 博客功能
│   │   │   └── [slug]/        # 动态博客文章
│   │   ├── projects/          # 项目展示
│   │   ├── resume/            # 简历页面
│   │   ├── guestbook/         # 留言板
│   │   ├── contact/           # 联系页面
│   │   ├── admin/             # 管理后台
│   │   └── api/               # API 路由
│   ├── components/            # 可复用组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   ├── blog/             # 博客相关组件
│   │   ├── project/          # 项目相关组件
│   │   ├── resume/           # 简历相关组件
│   │   └── guestbook/        # 留言板组件
│   ├── features/             # 功能模块
│   │   ├── blog/             # 博客功能
│   │   ├── project/          # 项目功能
│   │   ├── resume/           # 简历功能
│   │   └── guestbook/        # 留言板功能
│   ├── lib/                  # 工具库
│   │   └── utils.ts          # 通用工具函数
│   ├── hooks/                # 自定义 React Hooks
│   ├── types/                # TypeScript 类型定义
│   ├── constants/            # 常量定义
│   ├── config/               # 配置文件
│   ├── services/             # 服务层
│   ├── store/                # 状态管理
│   └── middlewares/          # 中间件
├── public/                   # 静态资源
├── tests/                    # 测试文件
├── scripts/                  # 构建脚本
└── 配置文件
    ├── package.json          # 项目依赖
    ├── tailwind.config.ts    # Tailwind 配置
    ├── components.json       # shadcn/ui 配置
    ├── tsconfig.json         # TypeScript 配置
    ├── next.config.ts        # Next.js 配置
    └── eslint.config.mjs     # ESLint 配置
```

## 功能模块

### 1. 博客系统 (Blog)
- 动态路由: `/blog/[slug]`
- 支持 Markdown 内容
- 文章列表和详情页面

### 2. 项目展示 (Projects)
- 项目列表页面
- 项目详情展示
- 技术栈标签

### 3. 简历页面 (Resume)
- 个人简历展示
- 技能和经验展示

### 4. 留言板 (Guestbook)
- 访客留言功能
- 评论系统

### 5. 联系页面 (Contact)
- 联系表单
- 联系信息展示

### 6. 管理后台 (Admin)
- 内容管理
- 用户管理

## 设计系统

### 颜色主题
- **背景色**: `#f8f9fa` (浅色) / `#18181b` (深色)
- **前景色**: `#18181b` (浅色) / `#f8f9fa` (深色)
- **主色调**: `#6366f1`
- **边框色**: `#e5e7eb` (浅色) / `#27272a` (深色)
- **卡片色**: `#fff` (浅色) / `#232326` (深色)
- **静音色**: `#6b7280` (浅色) / `#a1a1aa` (深色)

### 字体
- 使用 Geist 字体 (Vercel 官方字体)
- 支持系统字体回退

### 响应式设计
- 移动端优先设计
- 支持深色模式
- 流畅的动画效果

## 开发命令

```bash
# 开发服务器 (使用 Turbopack)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 部署

项目配置了 Vercel 部署，可以直接部署到 Vercel 平台。

## 项目特点

1. **现代化架构**: 使用 Next.js 15 和 React 19
2. **类型安全**: 完整的 TypeScript 支持
3. **性能优化**: 使用 Turbopack 和 App Router
4. **设计系统**: 基于 shadcn/ui 的组件库
5. **响应式**: 支持移动端和桌面端
6. **可访问性**: 遵循 Web 可访问性标准
7. **SEO 友好**: 服务端渲染和静态生成

## 开发状态

目前项目处于初始开发阶段，主要功能模块的目录结构已创建，但具体实现还在进行中。项目采用了良好的架构设计，为后续功能开发提供了坚实的基础。 