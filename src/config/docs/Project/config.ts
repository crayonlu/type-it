// 项目页配置文件
import type { Project } from '@/types/project';
import { PROJECT_DOCS_BASE, PROJECT_IMG_BASE } from '@/types/project';

const project_config: Project[] = [
  {
    name: 'Type-it',
    desc: '嘻嘻 这是基于NEXT的个人网站框架 采用Tailwind+React+Bun+Ts开发',
    cover: `${PROJECT_IMG_BASE}/type-it/cover.png`,
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Bun'],
    link: 'https://crayoncreator.top',
    docs: `${PROJECT_DOCS_BASE}/Type-it.md`,
  },
  {
    name: 'Zaptune',
    desc: '发力发力 我要下载音乐 嘻嘻',
    cover: `${PROJECT_IMG_BASE}/zaptune/cover.png`,
    techStack: ['Vue','Pinia','Nginx'],
    link: 'https://zaptune.crayoncreator.top',
  },
];

export default project_config;