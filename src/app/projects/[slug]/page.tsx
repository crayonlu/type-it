// 项目详情页
import { notFound } from "next/navigation"
import project_config from "@/config/docs/Project/config"
import { MarkdownRender } from "@/components/blog/markdown-render"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// 动态导入 markdown 文档
async function getProjectDocs(projectName: string) {
  try {
    // 直接根据项目名称导入对应的文档
    if (projectName === 'Type-it') {
      const { default: content } = await import(`@/config/docs/Project/Type-it.md`)
      return content
    }
    return ""
  } catch (error) {
    console.error('Failed to load project docs:', error)
    return ""
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = project_config.find(p => p.name === decodeURIComponent(params.slug))
  
  if (!project) {
    notFound()
  }

  // 加载项目文档
  const docsContent = await getProjectDocs(project.name)

  return (
    <main className="min-h-screen bg-background">
      {/* 项目信息 Section */}
      <section className="w-full border-b border-border bg-card">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* 项目标题 */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {project.name}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
      {docsContent && (
        <section className="w-full">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="prose-container">
                <MarkdownRender 
                  content={docsContent}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}