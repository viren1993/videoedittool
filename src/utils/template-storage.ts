import { nanoid } from "nanoid";

export interface DynamicField {
  id: string;
  path: string;
  label: string;
  type: "text" | "image" | "video" | "audio";
  placeholder: string;
  value: string;
  isLocked: boolean;
  trackItemId: string;
}

export interface SavedTemplate {
  id: string;
  name: string;
  category?: string;
  aspectRatio: string;
  createdAt: string;
  updatedAt: string;
  templateData: any;
  dynamicFields: DynamicField[];
  thumbnail?: string;
}

const TEMPLATES_KEY = "video_editor_templates";

export function getTemplates(): SavedTemplate[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(TEMPLATES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getTemplate(id: string): SavedTemplate | null {
  const templates = getTemplates();
  return templates.find(t => t.id === id) || null;
}

export function saveTemplate(template: Omit<SavedTemplate, "id" | "createdAt" | "updatedAt">): SavedTemplate {
  const templates = getTemplates();
  const now = new Date().toISOString();
  const newTemplate: SavedTemplate = {
    ...template,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
  };
  templates.push(newTemplate);
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  return newTemplate;
}

export function updateTemplate(id: string, updates: Partial<SavedTemplate>): SavedTemplate | null {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  templates[index] = {
    ...templates[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  return templates[index];
}

export function deleteTemplate(id: string): boolean {
  const templates = getTemplates();
  const filtered = templates.filter(t => t.id !== id);
  if (filtered.length === templates.length) return false;
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
  return true;
}

export function extractDynamicFields(templateData: any): DynamicField[] {
  const fields: DynamicField[] = [];
  const trackItemsMap = templateData.trackItemsMap || {};
  
  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;
    
    if (trackItem.type === "text" && trackItem.details?.text) {
      const text = trackItem.details.text;
      const placeholderMatch = text.match(/\{\{([^}]+)\}\}/g);
      
      if (placeholderMatch) {
        for (const match of placeholderMatch) {
          const path = match.replace(/\{\{|\}\}/g, "");
          fields.push({
            id: nanoid(),
            path,
            label: formatFieldLabel(path),
            type: "text",
            placeholder: text,
            value: "",
            isLocked: trackItem.metadata?.isLocked || false,
            trackItemId: itemId,
          });
        }
      }
    }
    
    if ((trackItem.type === "image" || trackItem.type === "video" || trackItem.type === "audio") && trackItem.details?.src) {
      const src = trackItem.details.src;
      const placeholderMatch = src.match(/\{\{([^}]+)\}\}/);
      
      if (placeholderMatch) {
        const path = placeholderMatch[1];
        fields.push({
          id: nanoid(),
          path,
          label: formatFieldLabel(path),
          type: trackItem.type as "image" | "video" | "audio",
          placeholder: src,
          value: "",
          isLocked: trackItem.metadata?.isLocked || false,
          trackItemId: itemId,
        });
      }
    }
  }
  
  return fields;
}

function formatFieldLabel(path: string): string {
  return path
    .split(/[._]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function applyDynamicData(templateData: any, fields: DynamicField[]): any {
  const newData = JSON.parse(JSON.stringify(templateData));
  const trackItemsMap = newData.trackItemsMap || {};
  
  for (const field of fields) {
    if (!field.value) continue;
    
    const trackItem = trackItemsMap[field.trackItemId];
    if (!trackItem) continue;
    
    if (field.type === "text" && trackItem.details?.text) {
      trackItem.details.text = trackItem.details.text.replace(
        `{{${field.path}}}`,
        field.value
      );
    }
    
    if ((field.type === "image" || field.type === "video" || field.type === "audio") && trackItem.details?.src) {
      trackItem.details.src = field.value;
    }
  }
  
  return newData;
}
