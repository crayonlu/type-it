// post
import type { BlogPost } from "@/types/blog"
import Tag from "./components/tag";

export default function Post(props: BlogPost){
  const ExistCover = props.cover;

  return (
    <div className="break-inside-avoid mb-6 flex flex-col bg-card text-card-foreground rounded-[var(--radius)] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {ExistCover && (
        <div className="w-full h-48 overflow-hidden flex-shrink-0">
          <img 
            src={props.cover} 
            alt="cover/封面" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
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
  )
}
