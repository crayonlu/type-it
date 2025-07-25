import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FolderOpen, 
  User, 
  Circle,
  Settings,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Briefcase,
  Heart,
  Star,
  Search,
  Menu
} from 'lucide-react';

interface HeaderItemProps {
  title: string;
  link: string;
  icon: string;
  isActive?: boolean;
}

const iconMap = {
  Home,
  FolderOpen,
  User,
  Circle,
  Settings,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Briefcase,
  Heart,
  Star,
  Search,
  Menu,
};

export default function HeaderItem({ title, link, icon, isActive = false }: HeaderItemProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Circle;

  return (
    <Link
      href={link}
      className={cn(
        'group relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive 
          ? 'bg-accent text-accent-foreground' 
          : 'text-muted-foreground'
      )}
    >
      <IconComponent className="h-4 w-4" />
      <span className="font-medium">{title}</span>
    </Link>
  );
}
