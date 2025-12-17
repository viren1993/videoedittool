import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { label: "Alphabet", key: "alphabet" },
  { label: "Anniversary", key: "anniversary" },
  { label: "Diwali", key: "diwali" },
  { label: "Friendship", key: "friendship" },
];

interface Category {
  label: string;
  key: string;
}

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.key);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-text-primary flex h-12 flex-none items-center px-4 text-sm font-medium">
        Categories
      </div>
      <ScrollArea className="flex-1 lg:max-h-[calc(100%-48px)] max-h-[500px]">
        <div className="px-4 pb-4">
          <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
            Choose Template Category
          </div>
          <div className="flex flex-col gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const isSelected = selectedCategory === category.key;
              return (
                <Button
                  key={category.key}
                  variant={isSelected ? "secondary" : "outline"}
                  className={cn(
                    "justify-between h-11",
                    isSelected && "border-primary"
                  )}
                  onClick={() => handleSelectCategory(category)}
                >
                  <span>{category.label}</span>
                  {isSelected ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              );
            })}
          </div>

          {selectedCategory && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium mb-2">
                Selected: {CATEGORY_OPTIONS.find(c => c.key === selectedCategory)?.label}
              </div>
              <p className="text-xs text-muted-foreground">
                Templates in this category will be filtered based on your selection.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
