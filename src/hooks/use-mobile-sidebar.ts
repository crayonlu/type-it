import { useState, useEffect } from 'react';

/**
 * 移动端侧边栏逻辑Hook
 * 管理移动端侧边栏的开关状态和相关事件监听
 */
export function useMobileSidebar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 处理点击外部区域关闭侧边栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768 && isMobileSidebarOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsMobileSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSidebarOpen]);

  // 处理body滚动锁定
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  return {
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  };
}
