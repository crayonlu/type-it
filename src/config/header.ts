interface HeaderConfig {
  title: string;
  link: string;
  icon: string;
}

// 内部导航链接
export const navConfig: HeaderConfig[] = [
  {
    title: '首页',
    link: '/',
    icon: 'Home',
  },
  {
    title: '项目',
    link: '/projects',
    icon: 'FolderOpen',
  },
  {
    title: '博客',
    link: '/blog',
    icon: 'FileText',
  },
  {
    title: '关于',
    link: '/about',
    icon: 'User',
  },
];

// 跳转外部
export const actionsConfig: HeaderConfig[] = [
  {
    title: 'GitHub',
    link: 'https://github.com/crayonlu',
    icon: 'Computer',
  },
  {
    title: '邮箱',
    link: 'mailto:crayonlu@qq.com',
    icon: 'Mail',
  },
];

export const headerConfig = [...navConfig, ...actionsConfig];
