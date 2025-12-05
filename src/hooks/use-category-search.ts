import { useState, useEffect, useRef } from 'react';
import { CategoryItem } from '@/components/blog/CategorySelector';

/**
 * 分类搜索逻辑Hook
 * 管理分类搜索、展开状态和选择逻辑
 */
export function useCategorySearch(categoryList: CategoryItem[], selectedCategories: string[], onCategoriesChange: (categories: string[]) => void) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const isInitialized = useRef(false);

  const getAllCategoryNames = (cats: CategoryItem[]): string[] => {
    let names: string[] = [];
    cats.forEach(cat => {
      names.push(cat.name);
      if (cat.children.length > 0) {
        names = names.concat(getAllCategoryNames(cat.children));
      }
    });
    return names;
  };

  const allCategoryNames = getAllCategoryNames(categoryList);
  const areAllSelected = selectedCategories.length > 0 && selectedCategories.length === allCategoryNames.length;

  // 初始化时选择所有分类
  useEffect(() => {
    if (!isInitialized.current && categoryList.length > 0 && selectedCategories.length === 0) {
      onCategoriesChange(allCategoryNames);
      isInitialized.current = true;
    }
  }, [categoryList, selectedCategories, onCategoriesChange, allCategoryNames]);

  // 搜索时自动展开匹配的节点
  useEffect(() => {
    if (searchTerm) {
      const newExpanded = new Set<string>();
      
      const expandMatchingNodes = (cats: CategoryItem[]) => {
        cats.forEach(cat => {
          const hasMatchingChild = cat.children.some(child => 
            child.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          if (hasMatchingChild) {
            newExpanded.add(cat.name);
          }
          expandMatchingNodes(cat.children);
        });
      };
      
      expandMatchingNodes(categoryList);
      setExpandedNodes(newExpanded);
    } else {
      setExpandedNodes(new Set());
    }
  }, [searchTerm, categoryList]);

  const handleToggleCategory = (categoryName: string) => {
    const findCategory = (cats: CategoryItem[]): CategoryItem | undefined => {
      for (const cat of cats) {
        if (cat.name === categoryName) {return cat;}
        const found = findCategory(cat.children);
        if (found) {return found;}
      }
      return undefined;
    };
    
    const categoryObj = findCategory(categoryList);
    if (!categoryObj) {return;}

    const getChildCategoryNames = (cat: CategoryItem): string[] => {
      let names = [cat.name];
      if (cat.children.length > 0) {
        cat.children.forEach(child => {
          names = names.concat(getChildCategoryNames(child));
        });
      }
      return names;
    };
    
    const allNames = getChildCategoryNames(categoryObj);

    if (selectedCategories.includes(categoryName)) {
      onCategoriesChange(selectedCategories.filter(name => !allNames.includes(name)));
    } else {
      onCategoriesChange(Array.from(new Set([...selectedCategories, ...allNames])));
    }
  };

  const handleToggleExpand = (categoryName: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      onCategoriesChange([]);
    } else {
      onCategoriesChange(allCategoryNames);
    }
  };

  const handleClear = () => {
    onCategoriesChange([]);
    setSearchTerm('');
    setExpandedNodes(new Set());
  };

  return {
    searchTerm,
    setSearchTerm,
    expandedNodes,
    areAllSelected,
    handleToggleCategory,
    handleToggleExpand,
    handleToggleSelectAll,
    handleClear,
  };
}
