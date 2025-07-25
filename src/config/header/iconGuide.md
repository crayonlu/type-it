# Header 图标使用指南

## 可用的图标

### 导航相关
- `Home` - 首页
- `FolderOpen` - 项目/文件夹
- `User` - 用户/关于
- `FileText` - 文档/博客
- `Briefcase` - 工作/简历
- `Settings` - 设置

### 社交媒体
- `Github` - GitHub
- `Linkedin` - LinkedIn
- `Twitter` - Twitter/X
- `Mail` - 邮箱

### 其他
- `Heart` - 喜欢/收藏
- `Star` - 收藏/评分
- `Search` - 搜索
- `Menu` - 菜单

## 使用方法

在 `src/config/header/index.ts` 中配置：

```typescript
{
  title: '项目',
  link: '/projects',
  icon: 'FolderOpen', // 使用上述图标名称
}
```

## 添加新图标

1. 在 `src/components/header/components/headerItem.tsx` 中导入新图标
2. 在 `iconMap` 对象中添加映射
3. 在配置文件中使用新的图标名称

## 图标库

本项目使用 [Lucide React](https://lucide.dev/) 图标库，提供了 1000+ 个现代化图标。 