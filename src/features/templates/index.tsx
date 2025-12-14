"use client";

import { templates } from "@/data/templates";
import { Card, Text, Button, Grid, Flex, Badge } from "@radix-ui/themes";
import { Pencil, Trash2, Globe } from "lucide-react";
import { TemplateType } from "./type";

export default function Templates() {
  const handleEdit = (data: TemplateType) => {
    console.log("Edit:", data.id);
  };

  const handleDelete = (data: TemplateType) => {
    console.log("Delete:", data.id);
  };

  const handlePublic = (data: TemplateType) => {
    console.log("Make Public:", data.id);
  };

  return (
    <Grid columns="3" gap="4">
      {templates.map((template) => (
        <Card key={template.id} size="2">
          <img
            src={template?.preview_image_url || ""}
            alt={template.template_name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* Content */}
          <Flex direction="column" gap="2" mt="3">
            <Text size="4" weight="bold">
              {template.template_name}
            </Text>

            <Flex justify="between" align="center">
              <Badge color="blue" variant="soft">
                {template.category}
              </Badge>

              <Badge
                color={template.status === "active" ? "green" : "gray"}
                variant="soft"
              >
                {template.status}
              </Badge>
            </Flex>
          </Flex>
          <Flex gap="2" mt="4" justify="between">
            <Button variant="soft" onClick={() => handleEdit(template)}>
              <Pencil size={16} /> Edit
            </Button>

            <Button
              color="red"
              variant="soft"
              onClick={() => handleDelete(template)}
            >
              <Trash2 size={16} /> Delete
            </Button>

            <Button
              color="green"
              variant="soft"
              onClick={() => handlePublic(template)}
            >
              <Globe size={16} /> Public
            </Button>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
