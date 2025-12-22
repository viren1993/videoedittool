"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTemplateStore } from "@/store/use-template-store";
import Editor from "@/features/editor/editor";
import { Loader2 } from "lucide-react";

export default function TemplateEditPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchTemplate, currentTemplate, loading, error } = useTemplateStore();
  console.log("Current Template from Store:", fetchTemplate);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadTemplate = async () => {
      const id = params.id as string;
      const accessToken = session?.user?.access_token;

      if (!accessToken) {
        router.push("/signin");
        return;
      }

      if (!id) {
        router.push("/company/templates");
        return;
      }

      try {
        const template = await fetchTemplate(id, accessToken);
        if (!template) {
          router.push("/company/templates");
          return;
        }
        setInitialized(true);
      } catch (err) {
        console.error("Error loading template:", err);
        router.push("/company/templates");
      }
    };

    if (session) {
      loadTemplate();
    }
  }, [params.id, session, fetchTemplate, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to edit templates
        </p>
      </div>
    );
  }

  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">{error}</p>
          <button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  if (!currentTemplate || !currentTemplate.templateData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            Template not found or invalid data
          </p>
          <button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  // The templateData should already be the design object (extracted in store)
  // But ensure we have all required properties for the editor
  const templateData = fetchTemplate;
  console.log("Loaded template data for editor:", templateData);

  const editorDesign = {
    ...templateData,
    id: templateData.id || currentTemplate.id,
    fps: templateData.fps || 30,
    size: templateData.size || { width: 1080, height: 1920 },
    tracks: templateData.tracks || [],
    trackItemsMap: templateData.trackItemsMap || {},
    trackItemIds: templateData.trackItemIds || [],
    transitionsMap: templateData.transitionsMap || {},
    transitionIds: templateData.transitionIds || [],
  };

  return <Editor tempId={currentTemplate.id} initialDesign={editorDesign} />;
}
