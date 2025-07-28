"use client"

// 所有博客展示页
import { useState } from "react"
import blog_configs from "@/config/docs/Blog/config"
import extractCategories from "@/lib/blog/extract-categories"
import extractTags from "@/lib/blog/extract-tags"
import CategorySidebar from "@/components/blog/category-sidebar"
import filterBlogs from "@/lib/blog/filter-blogs"

export default function BlogsView(){
  const categories = extractCategories(blog_configs);
  const tags = extractTags(blog_configs);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const blogPosts = filterBlogs({tags:selectedTags,categories:selectedCategories})
  console.log(blogPosts);
  
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
      
      <div className="flex-1 overflow-y-auto">

      </div>
    </div>
  )
}
