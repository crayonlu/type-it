// 所有博客展示页
import blog_configs from "@/config/docs/Blog/config"
import extractCategories from "@/lib/blog/extract-categories"
import extractTags from "@/lib/blog/extract-tags";

export default function BlogsView(){
  const categories = extractCategories(blog_configs);
  const tags = extractTags(blog_configs);

  return (
    <div>
      博客页
    </div>
  )
}