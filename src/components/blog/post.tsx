// post
import type { BlogPost } from '@/types/blog';
import { useTranslations } from 'next-intl';
import Tag from './components/tag';
import { Glow } from '@codaworks/react-glow';
import Link from 'next/link';
import Image from 'next/image';
import { getSlugFromDocs } from '@/lib/blog/path-utils';

export default function Post(props: BlogPost){
  const t = useTranslations('Blog.Post');
  const ExistCover = props.cover;
  
  const slug = getSlugFromDocs(props.docs);

  return (
    <Link href={`/blog/${slug}`} className="block">
      <Glow>
        <div className="glow:text-accent-foreground/50 glow:bg-accent break-inside-avoid mb-6 flex flex-col bg-card text-card-foreground rounded-[var(--radius)] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border-1 cursor-pointer group">
          {ExistCover && props.cover && (
            <div className="w-full h-48 overflow-hidden flex-shrink-0 relative">
              <Image
                src={props.cover} 
                alt={t('Cover')} 
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex-grow">
              <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                {props.title}
              </h2>
              <p className="text-muted-foreground line-clamp-3 text-sm mt-2">
                {props.desc}
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {props.tags.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
              
              <div>
                <span className="text-xs text-muted-foreground">
                  {props.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Glow>
    </Link>
  );
}
