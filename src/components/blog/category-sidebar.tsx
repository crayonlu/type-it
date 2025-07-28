"use client"

import CategorySelector, { CategoryItem } from "./category-selector"
import TagSelector from "./tag-selector"

interface CategorySidebarProps {
  categories: CategoryItem[]
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  tags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export default function CategorySidebar({ 
  categories, 
  selectedCategories, 
  onCategoriesChange,
  tags,
  selectedTags,
  onTagsChange
}: CategorySidebarProps) {
  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      <div className="flex-1 flex flex-col min-h-0">
        <CategorySelector
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoriesChange={onCategoriesChange}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <TagSelector
          tags={tags}
          selectedTags={selectedTags}
          onTagsChange={onTagsChange}
        />
      </div>
    </div>
  )
}
