import { promises as fs } from 'fs';
import path from 'path';
import project_config from '@/config/docs/Project/config';

export interface ProjectWithContent {
  name: string
  desc: string
  techStack: string[]
  cover: string
  link?: string
  docs?: string
  content?: string
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  // 项目slug应该与项目名称匹配，考虑URL编码和大小写
  const decodedSlug = decodeURIComponent(slug);
  const project = project_config.find(p => 
    p.name.toLowerCase() === decodedSlug.toLowerCase() ||
    p.name === decodedSlug,
  );
  
  if (!project) {
    return null;
  }

  let content = '';
  
  if (project.docs) {
    try {
      // 将TypeScript路径别名转换为实际文件路径
      // project.docs 格式是 "@/config/docs/Project/Type-it.md"
      const relativePath = project.docs.replace('@/', 'src/');
      const docsPath = path.join(process.cwd(), relativePath);
      content = await fs.readFile(docsPath, 'utf8');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load project docs:', error);
      content = '';
    }
  }

  return {
    ...project,
    content,
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return project_config.map(project => project.name);
}
