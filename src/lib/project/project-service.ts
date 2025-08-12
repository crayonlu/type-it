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

// 动态扫描项目markdown文件
async function findProjectMarkdownFiles(): Promise<Map<string, string>> {
  const projectDir = path.join(process.cwd(), 'src/config/docs/Project');
  const markdownFiles = new Map<string, string>();
  
  try {
    const entries = await fs.readdir(projectDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const filePath = path.join(projectDir, entry.name);
        const projectName = entry.name.replace('.md', '');
        markdownFiles.set(projectName, filePath);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to scan project markdown files:', error);
  }
  
  return markdownFiles;
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
  
  // 动态查找对应的markdown文件
  const markdownFiles = await findProjectMarkdownFiles();
  const markdownPath = markdownFiles.get(project.name);
  
  if (markdownPath) {
    try {
      content = await fs.readFile(markdownPath, 'utf8');
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
