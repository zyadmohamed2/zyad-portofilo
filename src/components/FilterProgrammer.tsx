import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Code2 } from "lucide-react";

interface FilterProgrammerProps {
  categories: string[];
  technologies: string[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  onCategoryChange: (categories: string[]) => void;
  onTechnologyChange: (technologies: string[]) => void;
  onClearAll: () => void;
}

export function FilterProgrammer({
  categories = ["All", "Web", "Mobile", "Desktop", "AI/ML", "Backend"],
  technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Swift",
    "Kotlin",
    "Flutter",
    "Next.js",
  ],
  selectedCategories = [],
  selectedTechnologies = [],
  onCategoryChange,
  onTechnologyChange,
  onClearAll,
}: FilterProgrammerProps) {
  const toggleCategory = (category: string) => {
    if (category === "All") {
      onCategoryChange([]);
      return;
    }

    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onCategoryChange(newCategories);
  };

  const toggleTechnology = (technology: string) => {
    const newTechnologies = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter((t) => t !== technology)
      : [...selectedTechnologies, technology];

    onTechnologyChange(newTechnologies);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedTechnologies.length > 0;

  return (
    <div className="relative space-y-6 p-8 bg-gradient-to-br from-card/90 via-card to-card/80 border border-border/20 rounded-3xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
      {/* Programming Stamp */}
      <div className="absolute -top-3 -right-3 p-3 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl shadow-lg border border-primary/30 rotate-12 hover:rotate-0 transition-transform duration-500">
        <Code2 className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            Filter Projects
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            Refine your search
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all duration-300 group"
          >
            <X className="h-4 w-4 mr-1 group-hover:rotate-90 transition-transform duration-300" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
            <h4 className="text-sm font-semibold text-foreground">
              Categories
            </h4>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const isSelected =
                category === "All"
                  ? selectedCategories.length === 0
                  : selectedCategories.includes(category);

              return (
                <Button
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className={`h-10 px-5 text-xs font-semibold rounded-xl transition-all duration-300 group ${
                    isSelected
                      ? "bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl border-0 text-primary-foreground"
                      : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/40 hover:text-primary hover:shadow-md"
                  }`}
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    {category}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
            <h4 className="text-sm font-semibold text-foreground">
              Technologies
            </h4>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((technology) => {
              const isSelected = selectedTechnologies.includes(technology);

              return (
                <Badge
                  key={technology}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 px-4 py-2 font-semibold text-xs rounded-xl group hover:scale-105 ${
                    isSelected
                      ? "bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl border-0 text-primary-foreground"
                      : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/40 hover:text-primary hover:shadow-md"
                  }`}
                  onClick={() => toggleTechnology(technology)}
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    {technology}
                  </span>
                </Badge>
              );
            })}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-6 border-t border-gradient-to-r from-border/30 via-border/50 to-border/30">
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="text-xs font-medium text-primary">
              {selectedCategories.length + selectedTechnologies.length} filter
              {selectedCategories.length + selectedTechnologies.length !== 1
                ? "s"
                : ""}{" "}
              active
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
