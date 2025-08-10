'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Hash } from 'lucide-react';

export interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const t = useTranslations('Blog.Navigation');
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      headings.push({ id, text, level });
    }

    setHeadings(headings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) {return;}

    const headingElements = headings.map(item => 
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) {return;}

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => 
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current,
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    );

    headingElements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const getIndentClass = (level: number) => {
    switch (level) {
    case 1: return 'pl-2';
    case 2: return 'pl-4';
    case 3: return 'pl-8';
    case 4: return 'pl-12';
    case 5: return 'pl-16';
    case 6: return 'pl-20';
    default: return 'pl-0';
    }
  };

  const getFontSizeClass = (level: number) => {
    switch (level) {
    case 1: return 'text-base font-semibold';
    case 2: return 'text-sm font-medium';
    case 3: return 'text-sm';
    case 4: return 'text-xs';
    case 5: return 'text-xs';
    case 6: return 'text-xs';
    default: return 'text-sm';
    }
  };

  const getBorderClass = (level: number) => {
    switch (level) {
    case 1: return 'border-l-2 border-primary';
    case 2: return 'border-l border-border/50';
    case 3: return 'border-l border-border/30';
    default: return '';
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn('sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto', className)}>
      <div className="pb-4">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Hash className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">
            {t('ArticleNavigation')}
          </h4>
        </div>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'w-full text-left py-2 px-3 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground relative',
                  getIndentClass(heading.level),
                  getFontSizeClass(heading.level),
                  getBorderClass(heading.level),
                  activeId === heading.id
                    ? 'bg-primary/10  font-medium border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="block truncate leading-relaxed">
                  {heading.text}
                </span>
                {activeId === heading.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function useMarkdownHeadings() {
  const [headings, setHeadings] = useState<TocItem[]>([]);

  const addHeading = (id: string, text: string, level: number) => {
    setHeadings(prev => {
      const exists = prev.find(h => h.id === id);
      if (exists) {return prev;}
      return [...prev, { id, text, level }];
    });
  };

  const clearHeadings = () => {
    setHeadings([]);
  };

  return { headings, addHeading, clearHeadings };
}