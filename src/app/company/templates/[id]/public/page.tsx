"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  extractFieldsFromMetadata,
  applyFieldValues,
  type TrackItemField,
} from "@/utils/template-storage";
import { useSession } from "next-auth/react";
import { useTemplateStore } from "@/store/use-template-store";
import {
  ArrowLeft,
  Image as ImageIcon,
  Video,
  Music,
  Type,
  Lock,
  Upload,
  FileVideo,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import PreviewComposition from "./preview-composition";

export default function PublicTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const playerRef = useRef<PlayerRef>(null);
  const [fields, setFields] = useState<TrackItemField[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [previewData, setPreviewData] = useState<any>(null);
  const { data: session } = useSession();
  const { fetchTemplate, currentTemplate, loading, error } = useTemplateStore();

  useEffect(() => {
    const loadTemplate = async () => {
      const id = params.id as string;
      const accessToken = session?.user?.access_token;

      if (!accessToken) {
        if (session === null) {
          router.push("/signin");
        }
        return;
      }

      if (!id) {
        router.push("/company/templates");
        return;
      }

      try {
        const loadedTemplate = await fetchTemplate(id, accessToken);

        if (loadedTemplate && loadedTemplate.templateData) {
          // templateData is already extracted from template_json.design in the store
          const templateData = loadedTemplate.templateData;

          const extractedFields = extractFieldsFromMetadata(templateData);
          const editableFields = extractedFields.filter((f) => {
            if (f.metadata.isCustomerField) return true;
            if (!f.metadata.isLocked) return true;
            return false;
          });
          setFields(editableFields);

          const initialValues: Record<string, string> = {};
          editableFields.forEach((f) => {
            if (f.metadata.defaultValue) {
              initialValues[f.trackItemId] = f.metadata.defaultValue;
            }
          });
          setFieldValues(initialValues);
          setPreviewData(templateData);
        } else {
          router.push("/company/templates");
        }
      } catch (err) {
        console.error("Error loading template:", err);
        router.push("/company/templates");
      }
    };

    if (session) {
      loadTemplate();
    }
  }, [params.id, session, fetchTemplate, router]);

  const updateFieldValue = (trackItemId: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [trackItemId]: value,
    }));
  };

  const handleFileUpload = (trackItemId: string, file: File) => {
    const url = URL.createObjectURL(file);
    updateFieldValue(trackItemId, url);
  };

  const updatePreview = useCallback(() => {
    if (!currentTemplate || !currentTemplate.templateData) return;
    // Use the same template data structure as edit mode
    const templateData = currentTemplate.templateData;
    const updatedData = applyFieldValues(templateData, fieldValues);
    setPreviewData(updatedData);
  }, [currentTemplate, fieldValues]);

  useEffect(() => {
    updatePreview();
  }, [fieldValues, updatePreview]);

  const handleDownloadVideo = async () => {
    if (!previewData) return;

    try {
      // Use the render API to generate the final video
      const response = await fetch("/api/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          design: previewData,
          options: {
            fps: previewData.fps || 30,
            size: previewData.size,
            format: "mp4",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to render video");
      }

      const jobInfo = await response.json();
      const jobId = jobInfo.render.id;

      // Poll for completion
      let completed = false;
      let downloadUrl = null;

      while (!completed) {
        const statusResponse = await fetch(`/api/render?id=${jobId}`);
        const statusData = await statusResponse.json();

        if (statusData.render.status === "completed") {
          completed = true;
          downloadUrl = statusData.render.output;
        } else if (statusData.render.status === "failed") {
          throw new Error("Video rendering failed");
        } else {
          // Wait before polling again
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (downloadUrl) {
        // Download the rendered video
        const videoResponse = await fetch(downloadUrl);
        const blob = await videoResponse.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentTemplate?.name || "template"}-final.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download video. Please try again.");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to view templates
        </p>
      </div>
    );
  }

  if (loading) {
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-destructive">{error}</h1>
        <Link href="/company/templates">
          <Button>Back to Templates</Button>
        </Link>
      </div>
    );
  }

  if (!currentTemplate) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <Link href="/company/templates">
          <Button>Back to Templates</Button>
        </Link>
      </div>
    );
  }

  const template = currentTemplate;
  const customerFields = fields.filter((f) => f.metadata.isCustomerField);
  const editableFields = fields.filter(
    (f) => !f.metadata.isCustomerField && !f.metadata.isLocked
  );
  const textFields = customerFields.filter((f) => f.type === "text");
  const mediaFields = customerFields.filter((f) => f.type !== "text");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/company/templates">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">{template.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{template.aspectRatio}</span>
                {template.category && (
                  <>
                    <span>•</span>
                    <Badge variant="secondary">{template.category}</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Preview
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadVideo}
                    >
                      <FileVideo className="h-4 w-4 mr-1" />
                      Download Video
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="bg-black rounded-lg overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio:
                      (previewData?.size?.width || 1080) /
                      (previewData?.size?.height || 1920),
                    maxHeight: "70vh",
                  }}
                >
                  {previewData && (
                    <RemotionPlayer
                      ref={playerRef}
                      component={PreviewComposition}
                      inputProps={{ templateData: previewData }}
                      durationInFrames={
                        Math.round(
                          ((previewData.duration || 10000) / 1000) *
                            (previewData.fps || 30)
                        ) || 300
                      }
                      compositionWidth={previewData.size?.width || 1080}
                      compositionHeight={previewData.size?.height || 1920}
                      fps={previewData.fps || 30}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      controls
                      acknowledgeRemotionLicense
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Template</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill in your customer data to personalize your video
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(70vh-100px)]">
                  <div className="space-y-6 pr-4">
                    {customerFields.length > 0 && (
                      <>
                        {textFields.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <Type className="h-4 w-4" />
                              Customer Text Fields
                            </h3>
                            <div className="space-y-4">
                              {textFields.map((field) => (
                                <CustomerFieldInput
                                  key={field.id}
                                  field={field}
                                  value={fieldValues[field.trackItemId] || ""}
                                  onUpdate={updateFieldValue}
                                  onFileUpload={handleFileUpload}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {mediaFields.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <ImageIcon className="h-4 w-4" />
                              Customer Media Fields
                            </h3>
                            <div className="space-y-4">
                              {mediaFields.map((field) => (
                                <CustomerFieldInput
                                  key={field.id}
                                  field={field}
                                  value={fieldValues[field.trackItemId] || ""}
                                  onUpdate={updateFieldValue}
                                  onFileUpload={handleFileUpload}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {editableFields.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                          Additional Editable Fields
                        </h3>
                        <div className="space-y-4">
                          {editableFields.map((field) => (
                            <CustomerFieldInput
                              key={field.id}
                              field={field}
                              value={fieldValues[field.trackItemId] || ""}
                              onUpdate={updateFieldValue}
                              onFileUpload={handleFileUpload}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {fields.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No customizable fields in this template</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

interface CustomerFieldInputProps {
  field: TrackItemField;
  value: string;
  onUpdate: (trackItemId: string, value: string) => void;
  onFileUpload: (trackItemId: string, file: File) => void;
}

function CustomerFieldInput({
  field,
  value,
  onUpdate,
  onFileUpload,
}: CustomerFieldInputProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(field.trackItemId, acceptedFiles[0]);
      }
    },
    [field.trackItemId, onFileUpload]
  );

  const acceptMap: Record<string, Record<string, string[]>> = {
    image: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    video: { "video/*": [".mp4", ".webm", ".mov"] },
    audio: { "audio/*": [".mp3", ".wav", ".ogg", ".m4a"] },
  };
  const accept = acceptMap[field.type] || {};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    disabled: field.metadata.isLocked,
  });

  const getIcon = () => {
    switch (field.type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "audio":
        return <Music className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  if (field.type === "text") {
    return (
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          {getIcon()}
          {field.metadata.fieldLabel}
          {field.metadata.isCustomerField && (
            <Badge variant="secondary" className="text-xs">
              Customer
            </Badge>
          )}
          {field.metadata.isLocked && (
            <Lock className="h-3 w-3 text-muted-foreground" />
          )}
        </Label>
        <Input
          placeholder={
            field.metadata.placeholder ||
            `Enter ${field.metadata.fieldLabel.toLowerCase()}`
          }
          value={value}
          onChange={(e) => onUpdate(field.trackItemId, e.target.value)}
          disabled={field.metadata.isLocked}
        />
        {field.metadata.description && (
          <p className="text-xs text-muted-foreground">
            {field.metadata.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {getIcon()}
        {field.metadata.fieldLabel}
        {field.metadata.isCustomerField && (
          <Badge variant="secondary" className="text-xs">
            Customer
          </Badge>
        )}
        {field.metadata.isLocked && (
          <Lock className="h-3 w-3 text-muted-foreground" />
        )}
      </Label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        } ${field.metadata.isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="space-y-2">
            {field.type === "image" && (
              <img
                src={value}
                alt={field.metadata.fieldLabel}
                className="max-h-32 mx-auto rounded"
              />
            )}
            {field.type === "video" && (
              <video
                src={value}
                className="max-h-32 mx-auto rounded"
                controls
              />
            )}
            {field.type === "audio" && (
              <audio src={value} controls className="w-full" />
            )}
            <p className="text-xs text-muted-foreground">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="py-4">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? `Drop your ${field.type} here`
                : `Click or drag to upload ${field.type}`}
            </p>
          </div>
        )}
      </div>
      {field.metadata.description && (
        <p className="text-xs text-muted-foreground">
          {field.metadata.description}
        </p>
      )}
    </div>
  );
}
