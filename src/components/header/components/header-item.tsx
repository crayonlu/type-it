'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { animations } from '@config/gsap';
import { 
  Home, 
  FolderOpen, 
  User, 
  Circle,
  Settings,
  Mail,
  FileText,
  Briefcase,
  Heart,
  Star,
  Search,
  Menu,
  Computer,
  Airplay,
} from 'lucide-react';

interface HeaderItemProps {
  title: string;
  link: string;
  icon: string;
  isActive?: boolean;
  index?: number;
}

const iconMap = {
  Home,
  FolderOpen,
  User,
  Circle,
  Settings,
  Mail,
  FileText,
  Briefcase,
  Heart,
  Star,
  Search,
  Menu,
  Computer,
  Airplay,
};

export default function HeaderItem({ title, link, icon, isActive = false, index = 0 }: HeaderItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Circle;

  // 检查是否为外部链接
  const isExternalLink = link.startsWith('http') || link.startsWith('mailto:');

  useEffect(() => {
    if (itemRef.current) {
      animations.slideIn(itemRef.current, 'right', 0.6, index * 0.1);
    }
  }, [index]);

  return (
    <Link
      ref={itemRef}
      href={link}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      className={cn(
        'group relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive 
          ? 'bg-accent text-accent-foreground' 
          : 'text-muted-foreground',
      )}
    >
      <IconComponent className="h-4 w-4" />
      <span className="font-medium">{title}</span>
    </Link>
  );
}
