'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPost {
  slug: string
  title: string
  description?: string
  time?: string
  tags?: string[]
}

interface BlogNavigationProps {
  prevPost?: BlogPost
  nextPost?: BlogPost
  currentPost: {
    title: string
    slug: string
  }
  className?: string
}

export function BlogNavigation({ 
  prevPost, 
  nextPost, 
  currentPost,
  className, 
}: BlogNavigationProps) {
  const t = useTranslations('Blog.Navigation');

  return (
    <div className={cn('space-y-6 mt-12 pt-8 border-t border-border', className)}>
      {(prevPost || nextPost) && (
        <nav className="flex flex-col sm:flex-row justify-between items-stretch gap-4">
          {prevPost && (
            <div className="flex-1">
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md h-full"
              >
                <div className="shrink-0">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1 font-medium">{t('Previous')}</div>
                  <div className="font-medium text-foreground group-hover:text-accent-foreground line-clamp-2 mb-1">
                    {prevPost.title}
                  </div>
                  {prevPost.description && (
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {prevPost.description}
                    </div>
                  )}
                  {prevPost.time && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(prevPost.time).toLocaleDateString('zh-CN')}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )}

          {nextPost && (
            <div className="flex-1">
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md h-full text-right"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1 font-medium">{t('Next')}</div>
                  <div className="font-medium text-foreground group-hover:text-accent-foreground line-clamp-2 mb-1">
                    {nextPost.title}
                  </div>
                  {nextPost.description && (
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {nextPost.description}
                    </div>
                  )}
                  {nextPost.time && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(nextPost.time).toLocaleDateString('zh-CN')}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </div>
          )}
        </nav>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md text-sm"
        >
          <List className="w-4 h-4" />
          <span>{t('AllArticles')}</span>
        </Link>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-md text-sm"
        >
          <Home className="w-4 h-4" />
          <span>{t('BackToHome')}</span>
        </Link>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>{t('CurrentArticle')}：{currentPost.title}</p>
      </div>
    </div>
  );
} 