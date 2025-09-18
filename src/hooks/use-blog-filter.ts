import { useState } from 'react';
import blog_configs from '@/config/docs/Blog/config';
import extractCategories from '@/lib/blog/extract-categories';
import extractTags from '@/lib/blog/extract-tags';
import filterBlogs from '@/lib/blog/filter-blogs';

/**
 * 博客筛选逻辑Hook
 * 管理分类和标签的筛选状态
 */
export function useBlogFilter() {
  const categories = extractCategories(blog_configs);
  const tags = extractTags(blog_configs);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const blogPosts = filterBlogs({
    tags: selectedTags,
    categories: selectedCategories,
  });

  return {
    categories,
    tags,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    blogPosts,
  };
}
