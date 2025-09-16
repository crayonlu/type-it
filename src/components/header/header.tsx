'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { actionsConfig, navConfig } from '@/config/header';
import { animations, timelines } from '@config/gsap';
import HeaderItem from './components/header-item';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LangToggle } from '@/components/lang/lang-toggle';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('HomePage.Header');
  const commonT = useTranslations('Common');

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMobileMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

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
    <>
      <header
        ref={headerRef}
        className="sticky top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <h1
                ref={logoRef}
                className="text-xl font-bold text-foreground"
              >
                Crayon...
              </h1>
            </div>

            {/* Navigation - 桌面端显示 */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center space-x-1"
            >
              {navConfig.map((item, index) => (
                <HeaderItem
                  key={index}
                  title={t(`${item.title}`)}
                  link={item.link}
                  icon={item.icon}
                  isActive={pathname === item.link}
                  index={index}
                />
              ))}
            </nav>

            {/* Actions - 桌面端显示 */}
            <div
              ref={actionsRef}
              className="hidden md:flex items-center space-x-2"
            >
              {actionsConfig.map((item, index) => (
                <HeaderItem
                  key={`action-${index}`}
                  title={item.title === 'Email' ? commonT('Email') : item.title}
                  link={item.link}
                  icon={item.icon}
                  isActive={false}
                  index={index}
                />
              ))}
              <LangToggle />
              <ThemeToggle />
            </div>

            {/* 移动端菜单按钮 */}
            <div className="flex md:hidden items-center space-x-2">
              <LangToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端导航菜单 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
            onClick={closeMobileMenu}
          />
          
          {/* 导航菜单 */}
          <div
            ref={mobileMenuRef}
            className="fixed right-0 top-16 w-80 sm:w-96 h-full bg-background/95 backdrop-blur border-l border-border shadow-2xl animate-in slide-in-from-right-0 duration-300 ease-out"
          >
            {/* 菜单头部 */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">菜单</h2>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto h-[calc(100%-4rem)]">
              {/* 内部导航链接 */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2 border-b border-border">
                  导航
                </h3>
                <div className="space-y-1">
                  {navConfig.map((item, index) => (
                    <HeaderItem
                      key={index}
                      title={t(`${item.title}`)}
                      link={item.link}
                      icon={item.icon}
                      isActive={pathname === item.link}
                      index={index}
                      onClick={handleNavClick}
                      className="w-full justify-start text-base py-2 sm:py-3"
                    />
                  ))}
                </div>
              </div>

              {/* 外部链接 */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2 border-b border-border">
                  链接
                </h3>
                <div className="space-y-1">
                  {actionsConfig.map((item, index) => (
                    <HeaderItem
                      key={`mobile-action-${index}`}
                      title={item.title === 'Email' ? commonT('Email') : item.title}
                      link={item.link}
                      icon={item.icon}
                      isActive={false}
                      index={index}
                      className="w-full justify-start text-base py-2 sm:py-3"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
