import { headerConfig } from '@/config/header';
import HeaderItem from './components/headerItem';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-foreground">
              Type-It
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {headerConfig.map((item, index) => (
              <HeaderItem
                key={index}
                title={item.title}
                link={item.link}
                icon={item.icon}
                isActive={false}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* 可以添加其他操作按钮，比如主题切换、用户菜单等 */}
          </div>
        </div>
      </div>
    </header>
  );
}