"use client";

import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import {
  Pencil,
  Trash2,
  Loader2,
  Video,
  ExternalLink,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { useTemplateStore } from "@/store/use-template-store";
import { CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";

export default function Templates() {
  const router = useRouter();
  const { data: session } = useSession();
  const { templates, loading, error, fetchTemplates, deleteTemplate } =
    useTemplateStore();
  useEffect(() => {
    const accessToken = session?.user?.access_token;
    if (accessToken) {
      fetchTemplates(accessToken);
    } else if (session === null) {
      router.push("/signin");
    }
  }, [session, fetchTemplates, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    const accessToken = session?.user?.access_token;
    if (!accessToken) {
      toast.error("Authentication required");
      return;
    }

    const success = await deleteTemplate(id, accessToken);
    if (success) {
      toast.success("Template deleted successfully");
    } else {
      toast.error("Failed to delete template");
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
    <Grid>
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
          <Link href={routes.company.templatesCreate}>
            <Button>Go to Create Template </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <Grid className="pt-1 pb-2">
                  <CardTitle className="text-lg truncate">
                    {template.template_name}
                  </CardTitle>
                  <Text as="p" className="text-sm text-gray-400">
                    Category :{" "}
                    <span className="text-gray-300 ">{template.category}</span>
                  </Text>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{template.template_json?.aspectRatio}</span>
                  </div>
                </Grid>
                <Grid>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    {template.template_json?.thumbnail ? (
                      <img
                        src={template.template_json.thumbnail}
                        alt={template.template_name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <Video className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 mb-2">
                    Created {formatDate(template.created_at)}
                  </p>
                </Grid>
                <Grid columns="2" className="gap-2 mb-2">
                  <Link
                    href={`/company/templates/${template.id}/edit`}
                    className="flex-1"
                  >
                    <Button
                      style={{
                        width: "100%",
                      }}
                      color="indigo"
                      variant="solid"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Link
                    href={`/company/templates/${template.id}/customer`}
                    className="flex-1"
                  >
                    <Button
                      style={{
                        width: "100%",
                      }}
                      color="orange"
                      variant="solid"
                    >
                      <Users className="h-4 w-4" /> Customer
                    </Button>
                  </Link>
                </Grid>
                <Grid columns="2" className="gap-2">
                  <Link
                    href={`/company/templates/${template.id}/public`}
                    className="flex-1"
                  >
                    <Button
                      style={{
                        width: "100%",
                      }}
                      variant="solid"
                      color="green"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Public
                    </Button>
                  </Link>
                  <Button
                    variant="solid"
                    color="ruby"
                    style={{
                      width: "100%",
                    }}
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </Grid>
              </Card>
            ))}
          </div>
        </>
      )}
    </Grid>
  );
}
