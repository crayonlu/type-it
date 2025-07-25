"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { navConfig, actionsConfig } from '@/config/header';
import { animations, timelines } from '@config/gsap';
import HeaderItem from './components/headerItem';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      // 整个header从上方滑入
      animations.slideIn(headerRef.current, 'up', 0.8, 0.2);
    }

    if (logoRef.current) {
      // Logo缩放动画
      animations.scaleIn(logoRef.current, 0.6, 0.4);
    }

    if (navRef.current) {
      // 导航项序列动画
      const navItems = navRef.current.querySelectorAll('a');
      timelines.sequence(Array.from(navItems), 0.1, 0.5);
    }

    if (actionsRef.current) {
      // 操作按钮从右侧滑入
      animations.slideIn(actionsRef.current, 'right', 0.6, 0.8);
    }
  }, []);

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <h1 
              ref={logoRef}
              className="text-xl font-bold text-foreground"
            >
              Type-It
            </h1>
          </div>

          {/* Navigation - 内部链接 */}
          <nav 
            ref={navRef}
            className="flex items-center space-x-1"
          >
            {navConfig.map((item, index) => (
              <HeaderItem
                key={index}
                title={item.title}
                link={item.link}
                icon={item.icon}
                isActive={pathname === item.link}
                index={index}
              />
            ))}
          </nav>

          {/* Actions - 外部链接和主题切换 */}
          <div 
            ref={actionsRef}
            className="flex items-center space-x-2"
          >
            {actionsConfig.map((item, index) => (
              <HeaderItem
                key={`action-${index}`}
                title={item.title}
                link={item.link}
                icon={item.icon}
                isActive={false}
                index={index}
              />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}