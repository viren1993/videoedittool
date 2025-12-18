"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTemplate, type SavedTemplate } from "@/utils/template-storage";
import Editor from "@/features/editor/editor";

export default function TemplateEditPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<SavedTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const loadedTemplate = getTemplate(id);
    if (loadedTemplate) {
      setTemplate(loadedTemplate);
    } else {
      router.push("/templates");
    }
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Template not found</p>
      </div>
    );
  }

  return <Editor tempId={template.id} initialDesign={template.templateData} />;
}
