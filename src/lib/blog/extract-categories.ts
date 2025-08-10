// 获取所有分类
// 涉及递归

import type { CategoryNode, BlogCategory } from '@/types/blog';

function extractCategories(configs:BlogCategory[] ): CategoryNode[]{
  return (
    configs.filter( item => item.type === 'category' )
      .map( item => ({
        name: item.name,
        children: extractCategories(
        (item.children || []).filter(child => child.type === 'category') as BlogCategory[],
        ),
      }) )
  );
}

export default extractCategories;