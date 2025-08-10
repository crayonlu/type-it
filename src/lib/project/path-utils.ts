/**
 * 从项目 docs 路径中提取 slug
 * @param docs 完整路径，如 "@/config/docs/Project/type-it.md"
 * @returns slug，如 "type-it"
 */
export function getSlugFromProjectDocs(docs: string): string {
  const match = docs.match(/Project\/(.+)\.md$/);
  if (match) {
    return match[1];
  }
  
  const fallbackMatch = docs.match(/([^\/]+)\.md$/);
  if (fallbackMatch) {
    return fallbackMatch[1];
  }
  
  return docs.replace(/^.*\//, '').replace(/\.md$/, '');
}

/**
 * 从 slug 生成项目 docs 路径
 * @param slug 如 "type-it"
 * @returns 完整路径，如 "@/config/docs/Project/type-it.md"
 */
export function getProjectDocsFromSlug(slug: string): string {
  return `@/config/docs/Project/${slug}.md`;
}

/**
 * 检查路径是否为有效的项目路径
 * @param path 路径字符串
 * @returns 是否为有效路径
 */
export function isValidProjectPath(path: string): boolean {
  return path.includes('Project/') && path.endsWith('.md');
}
