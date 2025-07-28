"use client"

// 所有博客展示页
import { useState } from "react"
import blog_configs from "@/config/docs/Blog/config"
import extractCategories from "@/lib/blog/extract-categories"
import extractTags from "@/lib/blog/extract-tags"
import CategorySidebar from "@/components/blog/CategorySidebar"

export default function BlogsView(){
  const categories = extractCategories(blog_configs);
  const tags = extractTags(blog_configs);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <div className="flex h-screen">
      <CategorySidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
      />
      
      <div className="flex-1 overflow-y-auto">

      </div>
    </div>
  )
}
