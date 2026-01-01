"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTemplateStore } from "@/store/use-template-store";
import Editor from "@/features/editor/editor";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateId } from "@designcombo/timeline";

export default function TemplateEditPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const { fetchTemplate, currentTemplate, loading, error, setCurrentTemplate } =
    useTemplateStore();

  const [localError, setLocalError] = useState<string | null>(null);

  const id = params?.id as string;
  const accessToken = session?.user?.access_token;

  // Load Template
  useEffect(() => {
    if (!id) return setLocalError("Template ID is missing");
    if (!accessToken) return setLocalError("Access token missing");

    // Already loaded and valid
    if (currentTemplate?.id === id && currentTemplate?.template_json?.design) {
      return;
    }

    let active = true;

    const load = async () => {
      const result = await fetchTemplate(id, accessToken);

      if (!active) return;
      if (!result) {
        setLocalError("Template not found");
        setCurrentTemplate(null);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id, accessToken, fetchTemplate]);

  // 🚫 Auth UI
  if (status === "loading") {
    return <StatusScreen message="Authenticating..." />;
  }

  if (!session) {
    return (
      <RedirectScreen
        message="Please sign in to edit templates"
        buttonText="Sign In"
        redirect="/signin"
      />
    );
  }

  // 🚫 Error UI
  const displayError = error || localError;
  if (displayError) {
    return (
      <RedirectScreen
        message={displayError}
        subText={`Template ID: ${id}`}
        redirect="/company/templates"
      />
    );
  }

  // ⏳ Loading UI
  if (loading) {
    return (
      <StatusScreen
        message="Loading template..."
        subText={`Template ID: ${id}`}
      />
    );
  }

  // 🚫 Missing Template
  if (!currentTemplate) {
    return (
      <RedirectScreen
        message="Template not found"
        subText={`Expected ID: ${id}`}
        redirect="/company/templates"
      />
    );
  }

  const templateData = currentTemplate.template_json?.design;
  if (!templateData || typeof templateData !== "object") {
    return (
      <RedirectScreen
        message="Invalid template data"
        redirect="/company/templates"
      />
    );
  }

  // 🧠 Build final editor design object
  const editorDesign = {
    id:
      currentTemplate.template_json?.design?.id ||
      currentTemplate.template_json?.id ||
      generateId(),
    fps: templateData.fps || 30,
    size: templateData.size || { width: 1080, height: 1920 },
    tracks: templateData.tracks || [],
    trackItemsMap: templateData.trackItemsMap || {},
    trackItemIds: templateData.trackItemIds || [],
    transitionsMap: templateData.transitionsMap || {},
    transitionIds: templateData.transitionIds || [],
    backgroundColor: templateData.backgroundColor || "#000000",
  };

  return (
    <Editor
      id={editorDesign.id}
      tempId={currentTemplate.id}
      initialDesign={editorDesign}
    />
  );
}

/* ------------------ UI Helper Components ------------------ */

function StatusScreen({ message, subText }: any) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">{message}</p>
      {subText && <p className="text-sm text-muted-foreground">{subText}</p>}
    </div>
  );
}

function RedirectScreen({
  message,
  subText,
  buttonText = "Back",
  redirect,
}: any) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-destructive">{message}</p>
      {subText && <p className="text-sm text-muted-foreground">{subText}</p>}
      <Button className="px-4" onClick={() => router.push(redirect)}>
        {buttonText}
      </Button>
    </div>
  );
}
