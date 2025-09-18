import { useState, useEffect, useRef } from 'react';

/**
 * 标签搜索逻辑Hook
 * 管理标签搜索和选择逻辑
 */
export function useTagSearch(tags: string[], selectedTags: string[], onTagsChange: (tags: string[]) => void) {
  const [searchTerm, setSearchTerm] = useState('');
  const isInitialized = useRef(false);

  // 初始化时选择所有标签
  useEffect(() => {
    if (!isInitialized.current && tags.length > 0 && selectedTags.length === 0) {
      onTagsChange(tags);
      isInitialized.current = true;
    }
  }, [tags, selectedTags, onTagsChange]);

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(searchTerm.toLowerCase()),
  ).sort();

  const areAllSelected = selectedTags.length > 0 && selectedTags.length === tags.length;

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      onTagsChange([]);
    } else {
      onTagsChange(tags);
    }
  };
  
  const handleClear = () => {
    onTagsChange([]);
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredTags,
    areAllSelected,
    handleToggleTag,
    handleToggleSelectAll,
    handleClear,
  };
}
