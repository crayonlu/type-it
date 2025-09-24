// 项目页配置文件
import type { Project } from '@/types/project';
import { PROJECT_DOCS_BASE } from '@/types/project';

const project_config: Project[] = [
  {
    name: 'Type-it',
    desc: '嘻嘻 这是基于NEXT的个人网站框架 采用Tailwind+React+Bun+Ts开发',
    cover: 'https://cdn.crayoncreator.top/Projects/type-it/cover.png',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Bun'],
    link: 'https://crayoncreator.top',
    docs: `${PROJECT_DOCS_BASE}/Type-it.md`,
  },
  {
    name: 'PromptCopilot',
    desc: '基于Tarui开发的一款简洁优雅的Prompt管理工具',
    cover: 'https://cdn.crayoncreator.top/Projects/PromptCopilot/cover.png',
    techStack: ['Tarui', 'TypeScript', 'rust', 'React'],
    link: 'https://github.com/crayonlu/PromptCopilot',
    docs: `${PROJECT_DOCS_BASE}/PromptCopilot.md`,
  },
  {
    name: 'Zaptune',
    desc: '发力发力 我要下载音乐 嘻嘻',
    cover: 'https://cdn.crayoncreator.top/Projects/zaptune/cover.png',
    techStack: ['Vue','Pinia','Nginx'],
    link: 'https://zaptune.crayoncreator.top',
  },
];

export default project_config;