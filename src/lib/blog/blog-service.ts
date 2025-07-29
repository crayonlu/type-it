import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost } from '@/types/blog'
import blog_configs from '@/config/docs/Blog/config'
import { getAdjacentBlogPosts } from './flatten-blog-config'

interface BlogPostContent {
  title: string
  content: string
  slug: string
  filePath: string
  time?: string
  tags?: string[]
  desc?: string
  cover?: string
}

async function findAllMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        const subFiles = await findAllMarkdownFiles(fullPath)
        files.push(...subFiles)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`读取目录失败: ${dir}`, error)
  }
  
  return files
}

function generateSlugFromPath(filePath: string): string {
  const basePath = path.join(process.cwd(), 'src/config/docs/Blog')
  const relativePath = path.relative(basePath, filePath)
  
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
}

export async function getAllBlogPosts(): Promise<BlogPostContent[]> {
  const blogDir = path.join(process.cwd(), 'src/config/docs/Blog')
  const markdownFiles = await findAllMarkdownFiles(blogDir)
  
  const posts: BlogPostContent[] = []
  
  for (const filePath of markdownFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : path.basename(filePath, '.md')
      const slug = generateSlugFromPath(filePath)
      
      posts.push({
        title,
        content,
        slug,
        filePath
      })
    } catch (error) {
      console.error(`读取文件失败: ${filePath}`, error)
    }
  }
  
  return posts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostContent | null> {
  const allPosts = await getAllBlogPosts()
  const decodedPost = decodeURI(slug)
  return allPosts.find(post => post.slug === decodedPost) || null
}

export async function getAdjacentPosts(currentSlug: string): Promise<{
  prevPost?: { slug: string; title: string; desc?: string; time?: string }
  nextPost?: { slug: string; title: string; desc?: string; time?: string }
}> {
  // 使用扁平化配置获取相邻文章
  const { prevPost, nextPost } = getAdjacentBlogPosts(currentSlug, blog_configs)
  
  return {
    prevPost: prevPost ? {
      slug: prevPost.slug,
      title: prevPost.title,
      desc: prevPost.desc,
      time: prevPost.time
    } : undefined,
    nextPost: nextPost ? {
      slug: nextPost.slug,
      title: nextPost.title,
      desc: nextPost.desc,
      time: nextPost.time
    } : undefined
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.map(post => post.slug)
} 