import { ExternalLink, Github, Code2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image?: string;
  googleLink?: string;
  appleLink?: string;
  githubLink?: string;
  liveLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-2xl hover:scale-[1.03] transition-all duration-700 border border-border/20 bg-gradient-to-br from-card/95 via-card to-card/90 backdrop-blur-xl overflow-hidden rounded-2xl hover:border-primary/30">
      {/* Project Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/25 via-primary/15 to-primary/8 flex items-center justify-center">
            <div className="text-7xl font-bold text-primary/40 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-500">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent group-hover:from-black/20 transition-all duration-500" />

        {/* Category Badge */}
        <div className="absolute top-5 right-5">
          <span className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground backdrop-blur-md shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300">
            {project.category}
          </span>
        </div>

        {/* Programming Stamp */}
        <div className="absolute top-5 left-5">
          <div className="p-2 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-xl backdrop-blur-md border border-primary/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>

      <CardContent className="p-7 space-y-5">
        {/* Title and Technologies */}
        <div className="space-y-4">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs rounded-xl bg-gradient-to-r from-secondary/80 via-secondary to-secondary/90 text-secondary-foreground font-semibold border border-border/30 hover:border-primary/30 hover:scale-105 transition-all duration-300 shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-muted-foreground/90 transition-colors duration-300">
          {project.description}
        </CardDescription>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-3">
          {project.googleLink && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-10 px-5 text-xs font-semibold rounded-xl hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:text-primary-foreground hover:border-primary/50 hover:shadow-lg transition-all duration-300 group/btn border-border/50"
            >
              <a
                href={project.googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                Google
              </a>
            </Button>
          )}
          {project.appleLink && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-9 px-4 text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
            >
              <a
                href={project.appleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                Apple
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-9 px-4 text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                Code
              </a>
            </Button>
          )}
          {project.liveLink && (
            <Button
              size="sm"
              asChild
              className="h-10 px-5 text-xs font-semibold rounded-xl bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl transition-all duration-300 group/btn border-0"
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
