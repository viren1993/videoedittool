"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getTemplates,
  deleteTemplate,
  extractFieldsFromMetadata,
  type SavedTemplate,
} from "@/utils/template-storage";
import {
  getTemplatesFromAPI,
  deleteTemplateFromAPI,
} from "@/utils/template-api";
import {
  Trash2,
  ExternalLink,
  Video,
  Plus,
  Pencil,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const accessToken = session?.user?.access_token;

        // Try to fetch from API first if we have access token
        if (accessToken) {
          const apiTemplates = await getTemplatesFromAPI(accessToken);
          if (apiTemplates && apiTemplates.length > 0) {
            // Transform API templates to SavedTemplate format
            const transformedTemplates: SavedTemplate[] = apiTemplates.map(
              (t: any) => ({
                id: t.id,
                name: t.template_name || t.name,
                category: t.category,
                aspectRatio: t.aspectRatio || "16:9",
                createdAt: t.created_at || t.createdAt,
                updatedAt: t.updated_at || t.updatedAt,
                templateData: t.template_json || t.templateData,
                isPrivate: t.isPrivate,
                thumbnail: t.thumbnail,
              })
            );
            setTemplates(transformedTemplates);
          }
        } else {
          // Fallback to localStorage
          setTemplates(getTemplates());
        }
      } catch (error) {
        console.error("Error fetching templates from API:", error);
        // Fallback to localStorage on error
        setTemplates(getTemplates());
        toast.warning("Using local templates", {
          description: "Could not fetch templates from server",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    const accessToken = session?.user?.access_token;

    try {
      // Try to delete from API first if we have access token
      if (accessToken) {
        await deleteTemplateFromAPI(id, accessToken);
        toast.success("Template deleted successfully");
      } else {
        // Fallback to localStorage
        deleteTemplate(id);
      }
      setTemplates(getTemplates());
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
      // Fallback to localStorage on error
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

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Loading templates...</h2>
          </div>
        ) : templates.length === 0 ? (
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
                  <CardTitle className="text-lg truncate">
                    {template.name}
                  </CardTitle>
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
                    {
                      extractFieldsFromMetadata(template.templateData).filter(
                        (f) => f.metadata.isCustomerField
                      ).length
                    }{" "}
                    customer field(s)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(template.createdAt)}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link
                    href={`/template/${template.id}/edit`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link
                    href={`/template/${template.id}/public`}
                    className="flex-1"
                  >
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
