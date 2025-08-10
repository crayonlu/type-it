// 项目详情页
import { notFound } from "next/navigation"
import project_config from "@/config/docs/Project/config"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = project_config.find(p => p.name === decodeURIComponent(params.slug))
  
  if (!project) {
    notFound()
  }

  return (
    <main>

    </main>
  )
}