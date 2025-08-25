import { useState, useMemo } from "react";
import { ProjectCard, type Project } from "./ProjectCard";
import { FilterProgrammer } from "./FilterProgrammer";
import { ThemeToggle } from "./ThemeToggle";
import { Code2, Mail, MapPin, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "iOS Banking App",
    description:
      "A comprehensive banking application with advanced security features, real-time transactions, and intuitive user interface designed for iOS devices.",
    technologies: ["Swift", "UIKit", "Core Data", "Security"],
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    appleLink: "https://apps.apple.com",
    githubLink: "https://github.com",
  },
  {
    id: "2",
    title: "Google Cloud Analytics Dashboard",
    description:
      "Enterprise-level analytics dashboard built for Google Cloud Platform with real-time data visualization and advanced reporting capabilities.",
    technologies: ["React", "TypeScript", "Google Cloud", "D3.js"],
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    googleLink: "https://cloud.google.com",
    liveLink: "https://demo.example.com",
    githubLink: "https://github.com",
  },
  {
    id: "3",
    title: "Cross-Platform E-commerce",
    description:
      "Modern e-commerce solution with seamless integration across web and mobile platforms, featuring advanced payment processing.",
    technologies: ["Flutter", "Firebase", "Stripe", "Node.js"],
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    googleLink: "https://play.google.com",
    appleLink: "https://apps.apple.com",
    githubLink: "https://github.com",
  },
  {
    id: "4",
    title: "AI-Powered Content Management",
    description:
      "Intelligent content management system leveraging machine learning for automated content optimization and user experience enhancement.",
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    liveLink: "https://demo.example.com",
    githubLink: "https://github.com",
  },
  {
    id: "5",
    title: "Enterprise API Gateway",
    description:
      "Scalable microservices architecture with comprehensive API management, monitoring, and security features for enterprise applications.",
    technologies: ["Node.js", "Docker", "Kubernetes", "Redis"],
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    githubLink: "https://github.com",
    liveLink: "https://api.example.com",
  },
  {
    id: "6",
    title: "Desktop Productivity Suite",
    description:
      "Cross-platform desktop application suite for enhanced productivity with advanced collaboration features and cloud synchronization.",
    technologies: ["Electron", "React", "SQLite", "WebRTC"],
    category: "Desktop",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    githubLink: "https://github.com",
    liveLink: "https://download.example.com",
  },
];

interface MorphofolioProps {
  projects?: Project[];
}

export function Morphofolio({ projects = mockProjects }: MorphofolioProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const technologies = useMemo(() => {
    const techs = Array.from(new Set(projects.flatMap((p) => p.technologies)));
    return techs.sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category);

      const technologyMatch =
        selectedTechnologies.length === 0 ||
        selectedTechnologies.some((tech) =>
          project.technologies.includes(tech),
        );

      return categoryMatch && technologyMatch;
    });
  }, [projects, selectedCategories, selectedTechnologies]);

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedTechnologies([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

        {/* Navigation */}
        <nav className="relative border-b border-border/30 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <Code2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Portfolio
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">
                    Professional Software Developer
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative py-20 px-6">
          {/* Programming Stamps */}
          <div className="absolute top-10 left-10 p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-12 animate-pulse">
            <Code2 className="h-6 w-6 text-primary/60" />
          </div>
          <div
            className="absolute top-20 right-20 p-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl -rotate-12 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Code2 className="h-4 w-4 text-primary/40" />
          </div>
          <div
            className="absolute bottom-10 left-1/4 p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg rotate-45 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            <Code2 className="h-3 w-3 text-primary/30" />
          </div>
          <div
            className="absolute bottom-20 right-1/3 p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl -rotate-6 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            <Code2 className="h-5 w-5 text-primary/50" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Crafting Digital
                <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Passionate about creating efficient, scalable solutions with
                clean, maintainable code. Specializing in modern web and mobile
                applications.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Python",
                "Swift",
                "Flutter",
              ].map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Remote / Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>john.developer@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <FilterProgrammer
                categories={categories}
                technologies={technologies}
                selectedCategories={selectedCategories}
                selectedTechnologies={selectedTechnologies}
                onCategoryChange={setSelectedCategories}
                onTechnologyChange={setSelectedTechnologies}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3 relative">
            {/* Programming Stamp for Projects Section */}
            <div className="absolute -top-4 -right-4 p-4 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl shadow-xl border border-primary/30 rotate-6 hover:rotate-12 transition-transform duration-500 z-10">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>

            <div className="flex items-center justify-between mb-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-foreground to-foreground/70 bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                </div>
                <div className="flex items-center gap-4 ml-7">
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
                    <p className="text-sm font-semibold text-primary">
                      {filteredProjects.length} of {projects.length} projects
                    </p>
                  </div>
                  {(selectedCategories.length > 0 ||
                    selectedTechnologies.length > 0) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                      <span>Filtered results</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <Card className="p-16 text-center border-0 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
                <div className="text-muted-foreground space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                    <Code2 className="h-10 w-10 text-primary/60" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to discover more projects.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="mt-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        {/* Footer Programming Stamps */}
        <div className="absolute top-5 left-10 p-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg rotate-12 animate-pulse">
          <Code2 className="h-4 w-4 text-primary/40" />
        </div>
        <div
          className="absolute top-10 right-16 p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl -rotate-6 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Code2 className="h-5 w-5 text-primary/50" />
        </div>
        <div className="relative border-t border-border/30 bg-card/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
                  <Code2 className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-foreground font-semibold">
                  Let's build something amazing together
                </p>
                <p className="text-sm text-muted-foreground">
                  &copy; 2024 Professional Portfolio. Crafted with passion and
                  modern technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
