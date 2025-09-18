'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategorySearch } from '@/hooks/use-category-search';

export interface CategoryItem {
  name: string
  children: CategoryItem[]
}

interface CategorySelectorProps {
  categories: CategoryItem[]
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
}

interface CategoryNodeProps {
  category: CategoryItem
  level: number
  selectedCategories: string[]
  onToggle: (categoryName: string) => void
  searchTerm: string
  expandedNodes: Set<string>
  onToggleExpand: (categoryName: string) => void
}

function CategoryNode({ 
  category, 
  level, 
  selectedCategories, 
  onToggle, 
  searchTerm,
  expandedNodes,
  onToggleExpand,
}: CategoryNodeProps) {
  const hasChildren = category.children.length > 0;
  const isExpanded = expandedNodes.has(category.name);
  const isSelected = selectedCategories.includes(category.name);
  
  const matchesSearch = searchTerm === '' || 
    category.name.toLowerCase().includes(searchTerm.toLowerCase());
  
  const hasMatchingChildren = category.children.some(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.children.some(grandChild => 
      grandChild.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  
  const shouldShow = matchesSearch || hasMatchingChildren;
  
  if (!shouldShow) {return null;}

  return (
    <div className="space-y-1">
      <div 
        className={cn(
          'flex items-center space-x-2 py-2 px-2 rounded-md hover:bg-muted/50 transition-colors group',
          level > 0 && 'ml-4',
        )}
      >
        <div className="flex h-4 w-4 items-center justify-center">
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-full w-full p-0 opacity-60 group-hover:opacity-100"
              onClick={() => onToggleExpand(category.name)}
            >
              <ChevronRight className={cn('h-3 w-3 transition-transform duration-200', isExpanded && 'rotate-90')} />
            </Button>
          )}
        </div>
        
        <Checkbox
          id={`category-${category.name}-${level}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(category.name)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        
        <label
          htmlFor={`category-${category.name}-${level}`}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1',
            matchesSearch && searchTerm && 'bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded ',
          )}
        >
          {category.name}
        </label>
        
        {hasChildren && (
          <Badge variant="secondary" className="text-xs opacity-60 group-hover:opacity-100">
            {category.children.length}
          </Badge>
        )}
      </div>
      
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-[1000px]' : 'max-h-0',
        )}
      >
        {hasChildren && (
          <div className="pt-1 space-y-1">
            {category.children.map((child, index) => (
              <CategoryNode
                key={`${child.name}-${level + 1}-${index}`}
                category={child}
                level={level + 1}
                selectedCategories={selectedCategories}
                onToggle={onToggle}
                searchTerm={searchTerm}
                expandedNodes={expandedNodes}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategorySelector({ 
  categories, 
  selectedCategories, 
  onCategoriesChange, 
}: CategorySelectorProps) {
  const t = useTranslations('Blog.Sidebar');
  
  const {
    searchTerm,
    setSearchTerm,
    expandedNodes,
    areAllSelected,
    handleToggleCategory,
    handleToggleExpand,
    handleToggleSelectAll,
    handleClear,
  } = useCategorySearch(categories, selectedCategories, onCategoriesChange);

  return (
    <>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('CategoryFilter')}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSelectAll}
              className="text-xs"
            >
              {areAllSelected ? t('DeselectAll') : t('SelectAll')}
            </Button>
            {selectedCategories.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {t('Clear')} ({selectedCategories.length})
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('SearchCategories')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {categories.map((category, index) => (
            <CategoryNode
              key={`${category.name}-0-${index}`}
              category={category}
              level={0}
              selectedCategories={selectedCategories}
              onToggle={handleToggleCategory}
              searchTerm={searchTerm}
              expandedNodes={expandedNodes}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </div>
    </>
  );
}