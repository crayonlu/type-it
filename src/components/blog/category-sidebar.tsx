'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CategorySelector, { CategoryItem } from './category-selector';
import TagSelector from './tag-selector';

interface CategorySidebarProps {
  className?: string
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
  onTagsChange,
  className,
}: CategorySidebarProps) {
  const t = useTranslations('Blog.Sidebar');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      'bg-card border-r border-border h-full flex flex-col transition-all duration-300 relative',
      collapsed ? 'w-12' : 'w-80',
      className,
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 h-6 w-6 rounded-full border bg-background shadow-sm z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {!collapsed ? (
        <div>
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
      ) : (
        <div className="flex flex-col items-center pt-12 text-muted-foreground">
          <div className="rotate-90 whitespace-nowrap text-xs font-medium">{t('Filter')}</div>
        </div>
      )}
    </div>
  );
}
