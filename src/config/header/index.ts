interface HeaderConfig {
  title: string;
  link: string;
  icon: string;
}

export const headerConfig: HeaderConfig[] = [
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
]
