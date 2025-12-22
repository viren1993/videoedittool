import { create } from "zustand";
import {
  getTemplatesFromAPI,
  getTemplateFromAPI,
  saveTemplateToAPI,
  updateTemplateToAPI,
  deleteTemplateFromAPI,
  type TemplatePayload,
} from "@/utils/template-api";
import type { SavedTemplate } from "@/utils/template-storage";

interface TemplateStore {
  templates: SavedTemplate[];
  currentTemplate: SavedTemplate | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchTemplates: (accessToken: string) => Promise<void>;
  fetchTemplate: (
    id: string,
    accessToken: string
  ) => Promise<SavedTemplate | null>;
  saveTemplate: (
    payload: TemplatePayload,
    accessToken: string,
    isUpdate?: boolean,
    templateId?: string
  ) => Promise<SavedTemplate | null>;
  deleteTemplate: (id: string, accessToken: string) => Promise<boolean>;
  setCurrentTemplate: (template: SavedTemplate | null) => void;
  clearError: () => void;
  clearStore: () => void; // Clear all data on logout
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  currentTemplate: null,
  loading: false,
  error: null,

  fetchTemplates: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const apiTemplates = await getTemplatesFromAPI(accessToken);

      // Transform API templates to SavedTemplate format
      const transformedTemplates: SavedTemplate[] = apiTemplates.map(
        (t: any) => ({
          id: t.id || t._id,
          name: t.template_name || t.name,
          category: t.category,
          aspectRatio: t.aspectRatio || "16:9",
          createdAt: t.created_at || t.createdAt,
          updatedAt: t.updated_at || t.updatedAt,
          templateData:
            t.template_json?.design || t.template_json || t.templateData,
          isPrivate: t.isPrivate !== undefined ? t.isPrivate : true, // Default to private
          thumbnail: t.thumbnail,
        })
      );

      set({ templates: transformedTemplates, loading: false });
    } catch (error: any) {
      console.error("Error fetching templates:", error);
      set({
        error: error?.message || "Failed to fetch templates",
        loading: false,
      });
    }
  },

  fetchTemplate: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const apiTemplate = await getTemplateFromAPI(id, accessToken);

      if (!apiTemplate) {
        set({ loading: false, currentTemplate: null });
        return null;
      }

      // Extract template data - API returns { design: {...}, options: {...} }
      // We need to extract just the design part for the editor
      let templateData = null;

      if (apiTemplate.template_json) {
        // Check if template_json has the nested structure
        if (apiTemplate.template_json.design) {
          // New format: { design: {...}, options: {...} }
          templateData = apiTemplate.template_json.design;
        } else {
          // Old format: template_json is the design itself
          templateData = apiTemplate.template_json;
        }
      } else if (apiTemplate.templateData) {
        templateData = apiTemplate.templateData;
      }

      // Transform API template to SavedTemplate format
      const transformedTemplate: SavedTemplate = {
        id: apiTemplate.id || apiTemplate._id,
        name: apiTemplate.template_name || apiTemplate.name,
        category: apiTemplate.category,
        aspectRatio: apiTemplate.aspectRatio || "16:9",
        createdAt: apiTemplate.created_at || apiTemplate.createdAt,
        updatedAt: apiTemplate.updated_at || apiTemplate.updatedAt,
        templateData: templateData,
        isPrivate:
          apiTemplate.isPrivate !== undefined ? apiTemplate.isPrivate : true,
        thumbnail: apiTemplate.thumbnail,
      };

      set({ currentTemplate: transformedTemplate, loading: false });
      return transformedTemplate;
    } catch (error: any) {
      console.error("Error fetching template:", error);
      set({
        error: error?.message || "Failed to fetch template",
        loading: false,
        currentTemplate: null,
      });
      return null;
    }
  },

  saveTemplate: async (
    payload: TemplatePayload,
    accessToken: string,
    isUpdate = false,
    templateId?: string
  ) => {
    set({ loading: true, error: null });
    try {
      let result;
      if (isUpdate && templateId) {
        result = await updateTemplateToAPI(templateId, payload, accessToken);
      } else {
        result = await saveTemplateToAPI(payload, accessToken);
      }

      // Extract template data - handle both nested and flat structures
      const templateData =
        result.template_json?.design ||
        result.template_json ||
        result.templateData;

      // Transform to SavedTemplate format
      const savedTemplate: SavedTemplate = {
        id: result.id || result._id,
        name: result.template_name || result.name,
        category: result.category,
        aspectRatio: result.aspectRatio || "16:9",
        createdAt: result.created_at || result.createdAt,
        updatedAt: result.updated_at || result.updatedAt,
        templateData: templateData,
        isPrivate: result.isPrivate !== undefined ? result.isPrivate : true,
        thumbnail: result.thumbnail,
      };

      // Update local state
      if (isUpdate) {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === savedTemplate.id ? savedTemplate : t
          ),
          currentTemplate:
            state.currentTemplate?.id === savedTemplate.id
              ? savedTemplate
              : state.currentTemplate,
          loading: false,
        }));
      } else {
        set((state) => ({
          templates: [savedTemplate, ...state.templates],
          loading: false,
        }));
      }

      return savedTemplate;
    } catch (error: any) {
      console.error("Error saving template:", error);
      set({
        error: error?.message || "Failed to save template",
        loading: false,
      });
      return null;
    }
  },

  deleteTemplate: async (id: string, accessToken: string) => {
    set({ loading: true, error: null });
    try {
      await deleteTemplateFromAPI(id, accessToken);

      set((state) => ({
        templates: state.templates.filter((t) => t.id !== id),
        currentTemplate:
          state.currentTemplate?.id === id ? null : state.currentTemplate,
        loading: false,
      }));

      return true;
    } catch (error: any) {
      console.error("Error deleting template:", error);
      set({
        error: error?.message || "Failed to delete template",
        loading: false,
      });
      return false;
    }
  },

  setCurrentTemplate: (template: SavedTemplate | null) => {
    set({ currentTemplate: template });
  },

  clearError: () => {
    set({ error: null });
  },

  clearStore: () => {
    set({
      templates: [],
      currentTemplate: null,
      loading: false,
      error: null,
    });
  },
}));
