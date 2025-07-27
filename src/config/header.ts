interface HeaderConfig {
  title: string;
  link: string;
  icon: string;
}

// 内部导航链接
export const navConfig: HeaderConfig[] = [
  {
    title: 'Home',
    link: '/',
    icon: 'Home',
  },
  {
    title: 'Projects',
    link: '/projects',
    icon: 'FolderOpen',
  },
  {
    title: 'Blog',
    link: '/blog',
    icon: 'FileText',
  },
  {
    title: 'About',
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
    title: 'Email',
    link: 'mailto:crayonlu@qq.com',
    icon: 'Mail',
  },
];

export const headerConfig = [...navConfig, ...actionsConfig];
