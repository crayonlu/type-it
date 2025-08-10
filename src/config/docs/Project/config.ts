// 项目页配置文件
import type { Project } from "@/types/project";
import { PROJECT_DOCS_BASE, PROJECT_IMG_BASE } from "@/types/project";

const project_config: Project[] = [
  {
    name: "Type-it 个人网站",
    desc: "基于 Next.js 14 构建的现代化个人网站，集成了博客系统、项目展示、多语言支持等功能。采用 TypeScript 开发，使用 Tailwind CSS 进行样式设计，支持明暗主题切换。",
    cover: `${PROJECT_IMG_BASE}/type-it/cover.png`,
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "next-intl", "Bun"],
    link: "https://github.com/crayonlu/type-it"
  },
];

export default project_config;