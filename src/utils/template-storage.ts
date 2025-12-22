import { nanoid } from "nanoid";

export interface FieldMetadata {
  isCustomerField: boolean;
  fieldPath: string;
  fieldLabel: string;
  isLocked: boolean;
  dataType: "text" | "image" | "video" | "audio";
  placeholder?: string;
  defaultValue?: string;
  currentValue?: string;
  description?: string;
  acceptedFormats?: string[];
  maxSize?: number;
  previewUrl?: string;
  validation?: {
    type?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
}

export interface TrackItemField {
  id: string;
  trackItemId: string;
  type: "text" | "image" | "video" | "audio";
  metadata: FieldMetadata;
  currentSrc?: string;
  currentText?: string;
}

export interface SavedTemplate {
  id: string;
  name: string;
  category?: string;
  aspectRatio: string;
  createdAt: string;
  updatedAt: string;
  templateData: any;
  isPrivate?: boolean;
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
  return templates.find((t) => t.id === id) || null;
}

export function saveTemplate(
  template: Omit<SavedTemplate, "id" | "createdAt" | "updatedAt">
): SavedTemplate {
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

export function updateTemplate(
  id: string,
  updates: Partial<SavedTemplate>
): SavedTemplate | null {
  const templates = getTemplates();
  const index = templates.findIndex((t) => t.id === id);
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
  const filtered = templates.filter((t) => t.id !== id);
  if (filtered.length === templates.length) return false;
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
  return true;
}

export function extractFieldsFromMetadata(templateData: any): TrackItemField[] {
  const fields: TrackItemField[] = [];
  const trackItemsMap = templateData.trackItemsMap || {};

  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;
    const originalMetadata = trackItem.metadata as FieldMetadata | undefined;

    if (!originalMetadata || !originalMetadata.fieldPath) continue;

    const clonedMetadata: FieldMetadata = {
      ...originalMetadata,
      isLocked: originalMetadata.isCustomerField
        ? false
        : originalMetadata.isLocked ?? false,
    };

    const field: TrackItemField = {
      id: nanoid(),
      trackItemId: itemId,
      type: clonedMetadata.dataType || trackItem.type,
      metadata: clonedMetadata,
      currentSrc: trackItem.details?.src,
      currentText: trackItem.details?.text,
    };

    fields.push(field);
  }

  return fields;
}

export function getEditableFields(templateData: any): TrackItemField[] {
  const allFields = extractFieldsFromMetadata(templateData);
  return allFields.filter((f) => !f.metadata.isLocked);
}

export function getCustomerFields(templateData: any): TrackItemField[] {
  const allFields = extractFieldsFromMetadata(templateData);
  return allFields.filter((f) => f.metadata.isCustomerField);
}

export function applyFieldValues(
  templateData: any,
  fieldValues: Record<string, string>
): any {
  const newData = JSON.parse(JSON.stringify(templateData));
  const trackItemsMap = newData.trackItemsMap || {};

  for (const [trackItemId, value] of Object.entries(fieldValues)) {
    const trackItem = trackItemsMap[trackItemId];
    if (!trackItem) continue;

    const metadata = trackItem.metadata as FieldMetadata | undefined;
    if (!metadata) continue;

    if (metadata.isLocked && !metadata.isCustomerField) {
      continue;
    }

    if (metadata.dataType === "text" && trackItem.details?.text !== undefined) {
      trackItem.details.text = value;
      if (metadata) {
        metadata.currentValue = value;
      }
    }

    if (
      (metadata.dataType === "image" ||
        metadata.dataType === "video" ||
        metadata.dataType === "audio") &&
      trackItem.details?.src !== undefined
    ) {
      trackItem.details.src = value;
      if (metadata) {
        metadata.currentValue = value;
      }
    }
  }

  return newData;
}

export function formatFieldLabel(path: string): string {
  return path
    .split(/[._]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function createDefaultMetadata(
  type: "text" | "image" | "video" | "audio",
  fieldPath: string
): FieldMetadata {
  return {
    isCustomerField: false,
    fieldPath,
    fieldLabel: formatFieldLabel(fieldPath),
    isLocked: false,
    dataType: type,
    placeholder: `Enter ${formatFieldLabel(fieldPath).toLowerCase()}`,
    defaultValue: "",
    currentValue: "",
  };
}

export function updateTrackItemMetadata(
  templateData: any,
  trackItemId: string,
  metadataUpdates: Partial<FieldMetadata>
): any {
  const newData = JSON.parse(JSON.stringify(templateData));
  const trackItem = newData.trackItemsMap?.[trackItemId];

  if (!trackItem) return newData;

  if (!trackItem.metadata) {
    trackItem.metadata = {};
  }

  Object.assign(trackItem.metadata, metadataUpdates);

  if (trackItem.metadata.isCustomerField) {
    trackItem.metadata.isLocked = false;
  }

  return newData;
}
