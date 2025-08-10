// 获取所有tag

import type { BlogCategory, BlogPost } from '@/types/blog';

function extractTags(configs: (BlogCategory | BlogPost)[]): string[] {
  const result: string[] = [];
  configs.forEach(item => {
    if (item.type === 'post') {
      result.push(...item.tags);
    } else if (item.type === 'category' && Array.isArray(item.children)) {
      result.push(...extractTags(item.children));
    }
  });
  // 去重
  return [...new Set(result)];
}

export default extractTags;