/**
 * 从 docs 路径中提取 slug
 * @param docs 完整路径，如 "@/config/docs/Blog/前端/JS/JS1.md"
 * @returns slug，如 "前端/JS/JS1"
 * 
 * 测试用例:
 * - "@/config/docs/Blog/前端/JS/JS1.md" -> "前端/JS/JS1"
 * - "@/config/docs/Blog/我爱看电影/长安三万里.md" -> "我爱看电影/长安三万里"
 * - "@/config/docs/Blog/算法与数据结构/哈夫曼.md" -> "算法与数据结构/哈夫曼"
 */
export function getSlugFromDocs(docs: string): string {
  const match = docs.match(/Blog\/(.+)\.md$/)
  if (match) {
    return match[1]
  }
  
  const fallbackMatch = docs.match(/([^\/]+)\.md$/)
  if (fallbackMatch) {
    return fallbackMatch[1]
  }
  
  return docs.replace(/^.*\//, '').replace(/\.md$/, '')
}

/**
 * 从 slug 生成 docs 路径
 * @param slug 如 "前端/JS/JS1"
 * @returns 完整路径，如 "@/config/docs/Blog/前端/JS/JS1.md"
 */
export function getDocsFromSlug(slug: string): string {
  return `@/config/docs/Blog/${slug}.md`
}

/**
 * 检查路径是否为有效的博客路径
 * @param path 路径字符串
 * @returns 是否为有效路径
 */
export function isValidBlogPath(path: string): boolean {
  return path.includes('Blog/') && path.endsWith('.md')
} 