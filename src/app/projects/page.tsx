'use client'

import Project from "@/components/projects/project";
import project_config from "@/config/docs/Project/config";
import { useTranslations } from "next-intl";
import { GlowCapture } from "@codaworks/react-glow"

export default function ProjectsView() {
  const t = useTranslations("Project.Page");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("Title")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Description")}
        </p>
      </div>
      
      <GlowCapture>
        <div className="grid grid-cols-1 gap-8">
          {project_config.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </GlowCapture>
      
      {project_config.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t("NoProjects")}
          </p>
        </div>
      )}
    </div>
  );
}