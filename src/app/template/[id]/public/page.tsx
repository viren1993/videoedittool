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
  getTemplate,
  applyDynamicData,
  type SavedTemplate,
  type DynamicField,
} from "@/utils/template-storage";
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Video,
  Music,
  Type,
  Lock,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import PreviewComposition from "./preview-composition";

export default function PublicTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const playerRef = useRef<PlayerRef>(null);
  const [template, setTemplate] = useState<SavedTemplate | null>(null);
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<any>(null);

  useEffect(() => {
    const id = params.id as string;
    const loadedTemplate = getTemplate(id);
    if (loadedTemplate) {
      setTemplate(loadedTemplate);
      setFields(loadedTemplate.dynamicFields.map((f) => ({ ...f })));
      setPreviewData(loadedTemplate.templateData);
    }
    setLoading(false);
  }, [params.id]);

  const updateField = (fieldId: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, value } : f))
    );
  };

  const handleFileUpload = (fieldId: string, file: File) => {
    const url = URL.createObjectURL(file);
    updateField(fieldId, url);
  };

  const updatePreview = useCallback(() => {
    if (!template) return;
    const updatedData = applyDynamicData(template.templateData, fields);
    setPreviewData(updatedData);
  }, [template, fields]);

  useEffect(() => {
    updatePreview();
  }, [fields, updatePreview]);

  const handleDownload = () => {
    if (!template || !previewData) return;
    const blob = new Blob([JSON.stringify(previewData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.name}-customized.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <Link href="/templates">
          <Button>Back to Templates</Button>
        </Link>
      </div>
    );
  }

  const textFields = fields.filter((f) => f.type === "text");
  const mediaFields = fields.filter((f) => f.type !== "text");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/templates">
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
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="bg-black rounded-lg overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio:
                      template.templateData.size.width /
                      template.templateData.size.height,
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
                  Fill in the fields below to personalize your video
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(70vh-100px)]">
                  <div className="space-y-6 pr-4">
                    {textFields.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Type className="h-4 w-4" />
                          Text Fields
                        </h3>
                        <div className="space-y-4">
                          {textFields.map((field) => (
                            <FieldInput
                              key={field.id}
                              field={field}
                              onUpdate={updateField}
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
                          Media Fields
                        </h3>
                        <div className="space-y-4">
                          {mediaFields.map((field) => (
                            <FieldInput
                              key={field.id}
                              field={field}
                              onUpdate={updateField}
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

interface FieldInputProps {
  field: DynamicField;
  onUpdate: (fieldId: string, value: string) => void;
  onFileUpload: (fieldId: string, file: File) => void;
}

function FieldInput({ field, onUpdate, onFileUpload }: FieldInputProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(field.id, acceptedFiles[0]);
      }
    },
    [field.id, onFileUpload]
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
    disabled: field.isLocked,
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
          {field.label}
          {field.isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
        </Label>
        <Input
          placeholder={`Enter ${field.label.toLowerCase()}`}
          value={field.value}
          onChange={(e) => onUpdate(field.id, e.target.value)}
          disabled={field.isLocked}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {getIcon()}
        {field.label}
        {field.isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
      </Label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        } ${field.isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        {field.value ? (
          <div className="space-y-2">
            {field.type === "image" && (
              <img
                src={field.value}
                alt={field.label}
                className="max-h-32 mx-auto rounded"
              />
            )}
            {field.type === "video" && (
              <video
                src={field.value}
                className="max-h-32 mx-auto rounded"
                controls
              />
            )}
            {field.type === "audio" && (
              <audio src={field.value} controls className="w-full" />
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
    </div>
  );
}
