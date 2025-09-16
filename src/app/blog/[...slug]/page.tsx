import { notFound } from 'next/navigation';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { MarkdownRender } from '@/components/blog/markdown-render';
import { BlogNavigation } from '@/components/blog/blog-navigation';
import { getBlogPostBySlug, getAdjacentPosts, getAllBlogSlugs } from '@/lib/blog/blog-service';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');  
  
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const { prevPost, nextPost } = await getAdjacentPosts(slug);
  // console.log(prevPost,nextPost)
  
  return (
    <>
      <ReadingProgress />
     
      <main className="min-h-screen bg-background">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <TableOfContents 
                content={post.content}
              />
            </aside>

            <article className="flex-1 max-w-full">
              <header className="mb-8 pb-8 border-b border-border">
                <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.time || new Date().toISOString()}>
                    <span>发布于 {post.time ? new Date(post.time).toLocaleDateString('zh-CN') : new Date().toLocaleDateString('zh-CN')}</span>
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              <div className="w-full">
                <MarkdownRender 
                  content={post.content}
                />
              </div>

              <BlogNavigation 
                prevPost={prevPost ? {
                  slug: prevPost.slug,
                  title: prevPost.title,
                  description: prevPost.desc,
                  time: prevPost.time,
                } : undefined}
                nextPost={nextPost ? {
                  slug: nextPost.slug,
                  title: nextPost.title,
                  description: nextPost.desc,
                  time: nextPost.time,
                } : undefined}
                currentPost={{
                  title: post.title,
                  slug: slug,
                }}
              />
            </article>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(slug => ({ slug: slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const post = await getBlogPostBySlug(slug);
 
  if (!post) {
    return {
      title: '文章未找到',
    };
  }
  
  return {
    title: `${post.title} | 我的博客`,
    description: post.desc || `阅读关于${post.title}的详细内容`,
  };
}