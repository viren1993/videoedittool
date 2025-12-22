"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTemplateStore } from "@/store/use-template-store";
import Editor from "@/features/editor/editor";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TemplateEditPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { fetchTemplate, currentTemplate, loading, error, setCurrentTemplate } =
    useTemplateStore();

  const [isFetching, setIsFetching] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status !== "authenticated") {
      return;
    }

    const id = params.id as string;
    const accessToken = session?.user?.access_token;

    if (!accessToken) {
      setLocalError("No access token available");
      return;
    }

    if (!id) {
      setLocalError("Template ID is missing");
      router.push("/company/templates");
      return;
    }

    // Check if we already have this template loaded
    if (currentTemplate?.id === id && currentTemplate?.template_json?.design) {
      return;
    }

    let isMounted = true;

    const loadTemplate = async () => {
      try {
        setIsFetching(true);
        setLocalError(null);

        // Fetch the template
        const result = await fetchTemplate(id, accessToken);

        if (!isMounted) {
          return;
        }

        if (!result) {
          setLocalError("Template not found");
          setCurrentTemplate(null);
          return;
        } else {
        }
      } catch (err) {
        if (isMounted) {
          setLocalError(
            err instanceof Error ? err.message : "Failed to load template"
          );
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    loadTemplate();

    return () => {
      isMounted = false;
    };
  }, [
    status,
    params.id,
    session?.user?.access_token,
    fetchTemplate,
    currentTemplate?.id, // Only depend on the ID
  ]);

  // Handle authentication states
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            Please sign in to edit templates
          </p>
          <Button onClick={() => router.push("/signin")}>Sign In</Button>
        </div>
      </div>
    );
  }

  // Check for errors
  const displayError = error || localError;
  if (displayError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">{displayError}</p>
          <p className="text-sm text-muted-foreground">
            Expected template ID: {params.id}
          </p>
          <Button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  const isLoading = loading || isFetching;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading template...</p>
          <p className="text-sm text-muted-foreground">
            Loading template ID: {params.id}
          </p>
        </div>
      </div>
    );
  }

  // Check if template data is available
  if (!currentTemplate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Template not found</p>
          <p className="text-sm text-muted-foreground">
            Expected ID: {params.id}
          </p>
          <Button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  // Check if current template matches the ID we want
  if (currentTemplate.id !== params.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Template ID mismatch</p>
          <p className="text-sm text-muted-foreground">
            Loaded: {currentTemplate.id}, Expected: {params.id}
          </p>
          <Button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  if (!currentTemplate.template_json?.design) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Template data is missing</p>
          <p className="text-sm text-muted-foreground">
            Template ID: {currentTemplate.id}
          </p>
          <Button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const templateData = currentTemplate.template_json.design;

  if (typeof templateData !== "object" || templateData === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Invalid template data structure</p>
          <Button
            onClick={() => router.push("/company/templates")}
            className="px-4 py-2"
          >
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  // Check for blob URLs that weren't replaced
  const checkForBlobUrls = (data: any) => {
    if (!data || typeof data !== "object") return;

    if (data.trackItemsMap && typeof data.trackItemsMap === "object") {
      Object.values(data.trackItemsMap).forEach((item: any) => {
        if (item?.details?.src?.startsWith?.("blob:")) {
          console.warn("⚠️ Found blob URL in templateData:", item.details.src);
        }
      });
    }
  };

  checkForBlobUrls(templateData);

  // Prepare editor design
  const editorDesign = {
    id: currentTemplate.id,
    fps: templateData.fps || 30,
    size: templateData.size || { width: 1080, height: 1920 },
    tracks: Array.isArray(templateData.tracks) ? templateData.tracks : [],
    trackItemsMap: templateData.trackItemsMap || {},
    trackItemIds: Array.isArray(templateData.trackItemIds)
      ? templateData.trackItemIds
      : [],
    transitionsMap: templateData.transitionsMap || {},
    transitionIds: Array.isArray(templateData.transitionIds)
      ? templateData.transitionIds
      : [],
    ...templateData,
  };

  return (
    <>
      <Editor tempId={currentTemplate.id} initialDesign={editorDesign} />
    </>
  );
}
