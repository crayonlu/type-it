import { useState, useEffect } from 'react';

/**
 * 阅读进度逻辑Hook
 * 管理阅读进度条的状态和滚动监听
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const newProgress = Math.min(Math.max(scrollPercent, 0), 100);
      setProgress(newProgress);
      
      setIsVisible(newProgress > 10);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return {
    progress,
    isVisible,
  };
}
