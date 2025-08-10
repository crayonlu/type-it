'use client';

// 所有博客展示页
import { useState } from 'react';
import blog_configs from '@/config/docs/Blog/config';
import extractCategories from '@/lib/blog/extract-categories';
import extractTags from '@/lib/blog/extract-tags';
import CategorySidebar from '@/components/blog/category-sidebar';
import filterBlogs from '@/lib/blog/filter-blogs';
import Post from '@/components/blog/post';
import { GlowCapture } from '@codaworks/react-glow';

export default function BlogsView(){
  const categories = extractCategories(blog_configs);
  const tags = extractTags(blog_configs);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const blogPosts = filterBlogs({tags:selectedTags,categories:selectedCategories});
  
  return (
    <div className="flex h-screen">
      <CategorySidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        tags={tags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />
      
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <GlowCapture>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {blogPosts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </GlowCapture>
      </div>
    </div>
  );
}
