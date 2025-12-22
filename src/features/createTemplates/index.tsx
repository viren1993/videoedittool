"use client";

import { useEffect } from "react";
import Editor from "../editor";
import { useTemplateStore } from "@/store/use-template-store";

export default function CreateTemplates() {
  const { setCurrentTemplate } = useTemplateStore();

  // Clear current template when creating new template
  useEffect(() => {
    setCurrentTemplate(null);
  }, [setCurrentTemplate]);

  return <Editor />;
}
