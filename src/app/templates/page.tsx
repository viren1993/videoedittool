"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getTemplates, deleteTemplate, type SavedTemplate } from "@/utils/template-storage";
import { Trash2, ExternalLink, Video, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(id);
      setTemplates(getTemplates());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Templates</h1>
            <p className="text-muted-foreground mt-1">
              Manage your video templates and create public links
            </p>
          </div>
          <Link href="/edit">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </Link>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-16">
            <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No templates yet</h2>
            <p className="text-muted-foreground mb-6">
              Create a template in the editor and save it to see it here
            </p>
            <Link href="/edit">
              <Button>Go to Editor</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg truncate">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{template.aspectRatio}</span>
                    {template.category && (
                      <>
                        <span>•</span>
                        <span>{template.category}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    {template.thumbnail ? (
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <Video className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    {template.dynamicFields.length} dynamic field{template.dynamicFields.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(template.createdAt)}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/template/${template.id}/public`} className="flex-1">
                    <Button variant="default" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Public
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
