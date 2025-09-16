// 项目详情页
import { notFound } from 'next/navigation';
import { MarkdownRender } from '@/components/blog/markdown-render';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/project/project-service';

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* 项目信息 Section */}
      <section className="w-full border-b border-border bg-card">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto">
            {/* 项目标题 */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {project.name}
              </h1>
              <p className="text-xl text-muted-foreground mx-auto leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* 技术栈 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.techStack.map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-3 py-1 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 项目链接 */}
            {project.link && (
              <div className="text-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    查看项目
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 项目文档 Section */}
      {project.content && (
        <section className="w-full">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto">
              <MarkdownRender 
                content={project.content}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map(slug => ({ slug }));
}