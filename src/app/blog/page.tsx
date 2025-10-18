'use client';

// 所有博客展示页
import CategorySidebar from '@/components/blog/category-sidebar';
import CategorySelector from '@/components/blog/category-selector';
import TagSelector from '@/components/blog/tag-selector';
import Post from '@/components/blog/post';
import { GlowCapture } from '@codaworks/react-glow';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useBlogFilter } from '@/hooks/use-blog-filter';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';

export default function BlogsView(){
  const {
    categories,
    tags,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    blogPosts,
  } = useBlogFilter();
  
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useMobileSidebar();
  
  const t = useTranslations('Blog.Page');
  const sidebarT = useTranslations('Blog.Sidebar');
  
  return (
    <div className="flex h-[100dvh-4rem] relative">
      <div className="hidden md:block">
        <CategorySidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          tags={tags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          <div
            id="mobile-sidebar"
            className="overflow-y-auto fixed left-0 top-0 h-full w-80 bg-card border-r border-border shadow-2xl animate-in slide-in-from-left-0 duration-300"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">{sidebarT('Filter')}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 space-y-6">
              <CategorySelector
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoriesChange={setSelectedCategories}
              />
              <TagSelector
                tags={tags}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="h-full flex flex-col">
        <div className="md:hidden flex items-center justify-between p-4 px-8 border-b border-border bg-background/95 backdrop-blur">
          <h1 className="text-xl font-semibold">{t('Title')}</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {sidebarT('Filter')}
          </Button>
        </div>
        
        <div className="overflow-y-auto p-4 sm:p-6 pb-24">
          <GlowCapture>
            {blogPosts.length > 0 ? (
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
                {blogPosts.map((post, index) => (
                  <Post key={index} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {t('NoPosts')}
                </p>
              </div>
            )}
          </GlowCapture>
        </div>
      </div>
    </div>
  );
}
