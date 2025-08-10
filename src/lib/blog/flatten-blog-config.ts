import type { BlogPost, BlogCategory } from '@/types/blog';
import { getSlugFromDocs } from './path-utils';

interface FlattenedBlogPost {
  slug: string
  title: string
  desc: string
  time: string
  tags: string[]
  cover?: string
  docs: string
}

/**
 * 递归扁平化博客配置，提取所有文章
 * @param items 博客配置项数组
 * @returns 扁平化的博客文章数组
 */
function flattenBlogConfig(items: (BlogCategory | BlogPost)[]): FlattenedBlogPost[] {
  const result: FlattenedBlogPost[] = [];
  
  for (const item of items) {
    if (item.type === 'post') {
      const slug = getSlugFromDocs(item.docs);
      result.push({
        slug,
        title: item.title,
        desc: item.desc,
        time: item.time,
        tags: item.tags,
        cover: item.cover,
        docs: item.docs,
      });
    } else if (item.type === 'category' && item.children) {
      result.push(...flattenBlogConfig(item.children));
    }
  }
  
  return result;
}

/**
 * 获取所有扁平化的博客文章，按时间排序
 * @param blogConfig 博客配置
 * @returns 按时间排序的博客文章数组
 */
export function getAllFlattenedBlogPosts(blogConfig: (BlogCategory | BlogPost)[]): FlattenedBlogPost[] {
  const flattened = flattenBlogConfig(blogConfig);
  
  // 按时间排序，最新的在前面
  return flattened.sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * 获取相邻文章
 * @param currentSlug 当前文章的slug
 * @param blogConfig 博客配置
 * @returns 上一篇和下一篇文章
 */
export function getAdjacentBlogPosts(
  currentSlug: string, 
  blogConfig: (BlogCategory | BlogPost)[],
): {
  prevPost?: FlattenedBlogPost
  nextPost?: FlattenedBlogPost
} {
  // 解码当前slug
  const decodedSlug = decodeURIComponent(currentSlug);
  // console.log('解码后的slug:', decodedSlug)
  
  const allPosts = getAllFlattenedBlogPosts(blogConfig);
  // console.log('所有文章:', allPosts.map(p => ({ slug: p.slug, title: p.title })))
  
  const currentIndex = allPosts.findIndex(post => post.slug === decodedSlug);
  // console.log('当前文章索引:', currentIndex)
  
  if (currentIndex === -1) {
    // console.log('未找到当前文章')
    return {};
  }
  
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined;
  
  // console.log('相邻文章:', { 
  //   prevPost: prevPost ? { slug: prevPost.slug, title: prevPost.title } : undefined,
  //   nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : undefined
  // })
  
  return { prevPost, nextPost };
} 