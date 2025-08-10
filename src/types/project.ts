interface Project{
  // 项目名称
  name: string;
  // 项目简介
  desc: string;
  // 项目封面展示
  cover: string;
  // 技术栈
  techStack: string[];
  // 项目readme位置
  docs?: string;
  // 链接
  link?: string;
}

const PROJECT_DOCS_BASE = '@/config/docs/Project';
const PROJECT_IMG_BASE = '/images/Projects';

export type { Project };
export { PROJECT_DOCS_BASE, PROJECT_IMG_BASE };