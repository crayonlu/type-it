'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useTagSearch } from '@/hooks/use-tag-search';

interface TagSelectorProps {
  tags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export default function TagSelector({
  tags,
  selectedTags,
  onTagsChange,
}: TagSelectorProps) {
  const t = useTranslations('Blog.Sidebar');
  
  const {
    searchTerm,
    setSearchTerm,
    filteredTags,
    areAllSelected,
    handleToggleTag,
    handleToggleSelectAll,
    handleClear,
  } = useTagSearch(tags, selectedTags, onTagsChange);

  return (
    <>
      <div className="p-4 border-b border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('TagFilter')}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSelectAll}
              className="text-xs"
            >
              {areAllSelected ? t('DeselectAll') : t('SelectAll')}
            </Button>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {t('Clear')} ({selectedTags.length})
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('SearchTags')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
              onClick={() => handleToggleTag(tag)}
              className="cursor-pointer transition-colors hover:bg-primary/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}