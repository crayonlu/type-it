'use client';

// 项目展示组件
import type { Project } from '@/types/project';
import { useTranslations } from 'next-intl';
import { Glow } from '@codaworks/react-glow';
import Link from 'next/link';
import Image from 'next/image';

export default function Project(props: Project) {
  const t = useTranslations('Project');
  const ExistCover = props.cover;
  
  // 使用项目名称作为 slug
  const slug = props.name;

  return (
    <Link href={`/projects/${slug}`}>
      <Glow>
        <div className="glow:text-accent-foreground/50 glow:bg-accent w-full bg-card text-card-foreground rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border-1 group">
          {ExistCover && (
            <div className="w-full h-120 md:h-144 overflow-hidden flex-shrink-0">
              <Image 
                src={props.cover || ''} 
                alt={t('Cover')} 
                width={400}
                height={240}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {props.name}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {props.desc}
              </p>
            </div>
            
            <div className="mt-auto space-y-4">
              {/* 技术栈 */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t('TechStack')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {props.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30 transition-colors hover:bg-primary/30 dark:bg-primary/10 dark:border-primary/20 dark:hover:bg-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Glow>
    </Link>
  );
}