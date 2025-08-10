// 通过筛选条件返回 Blog Post
import type { BlogPost, BlogCategory } from '@/types/blog';
import blog_configs from '@/config/docs/Blog/config';

const recursiveFilter = (
  items: (BlogCategory | BlogPost)[],
  selectedCategories: string[],
  selectedTags: string[],
  currentPath: string[],
): BlogPost[] => {
  let results: BlogPost[] = [];

  for (const item of items) {
    if (item.type === 'post') {
      // 检查分类是否匹配
      // 如果没有选择分类，或者当前文章的分类路径中至少有一个被选中，则匹配
      const categoryMatch =
        selectedCategories.length === 0 ||
        currentPath.some(pathCategory => selectedCategories.includes(pathCategory));

      // 检查标签是否匹配
      // 如果没有选择标签，或者文章的标签中至少有一个被选中，则匹配
      const tagMatch =
        selectedTags.length === 0 ||
        (item.tags && item.tags.some(postTag => selectedTags.includes(postTag)));

      // 必须同时满足分类和标签的筛选条件
      if (categoryMatch && tagMatch) {
        results.push(item);
      }
    } else if (item.type === 'category' && item.children) {
      // 递归进入子分类
      results = results.concat(
        recursiveFilter(
          item.children,
          selectedCategories,
          selectedTags,
          [...currentPath, item.name],
        ),
      );
    }
  }
  return results;
};

/**
 * 根据提供的分类和标签筛选博客文章。
 * @param props - 包含筛选条件的对险，categories为分类数组，tags为标签数组
 * @returns 返回一个筛选后的 BlogPost 数组
 */
function filterBlogs(props: {
  tags: string[];
  categories: string[];
}): BlogPost[] {
  return recursiveFilter(blog_configs, props.categories, props.tags, []);
}

export default filterBlogs;