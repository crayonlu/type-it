'use client';

import { useState, useEffect, useRef } from 'react';

interface UseScrollSpyOptions {
  rootMargin?: string
  threshold?: number
}

export function useScrollSpy(
  headingIds: string[],
  options: UseScrollSpyOptions = {},
) {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) {return;}

    const { rootMargin = '-20% 0px -80% 0px', threshold = 0 } = options;

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
          
          const topEntry = sortedEntries[0];
          setActiveId(topEntry.target.id);
        } else {
          const allEntries = entries.sort((a, b) => {
            return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
          });
          
          if (allEntries.length > 0) {
            const closestEntry = allEntries[0];
            if (closestEntry.boundingClientRect.top < 0) {
              setActiveId(closestEntry.target.id);
            }
          }
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    headingIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.current?.observe(element);
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [headingIds, options]);

  return activeId;
}