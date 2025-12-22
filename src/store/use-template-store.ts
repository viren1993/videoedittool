import { create } from "zustand";
import {
  getTemplatesFromAPI,
  getTemplateFromAPI,
  saveTemplateToAPI,
  updateTemplateToAPI,
  deleteTemplateFromAPI,
  type TemplatePayload,
} from "@/utils/template-api";
import type { TemplateType } from "@/features/templates/type";

/**
 * Replace blob URLs in template data with permanent URLs from base arrays
 */
function replaceBlobUrlsWithPermanentUrls(
  templateData: any,
  baseVideoUrls: string[],
  baseImageUrls: string[],
  baseAudioUrls: string[]
): any {
  if (!templateData || typeof templateData !== "object") {
    return templateData;
  }

  const newData = JSON.parse(JSON.stringify(templateData));
  const trackItemsMap = newData.trackItemsMap || {};

  let videoIndex = 0;
  let imageIndex = 0;
  let audioIndex = 0;

  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;
    if (!trackItem.details?.src) continue;

    const src = trackItem.details.src;
    const isBlob = src.startsWith("blob:");

    if (isBlob) {
      if (trackItem.type === "video" && videoIndex < baseVideoUrls.length) {
        const oldSrc = trackItem.details.src;
        trackItem.details.src = baseVideoUrls[videoIndex];
        console.log(
          `🔄 Replaced video blob URL [${itemId}]:\n  From: ${oldSrc}\n  To: ${baseVideoUrls[videoIndex]}`
        );
        videoIndex++;
      } else if (
        trackItem.type === "image" &&
        imageIndex < baseImageUrls.length
      ) {
        const oldSrc = trackItem.details.src;
        trackItem.details.src = baseImageUrls[imageIndex];
        console.log(
          `🔄 Replaced image blob URL [${itemId}]:\n  From: ${oldSrc}\n  To: ${baseImageUrls[imageIndex]}`
        );
        imageIndex++;
      } else if (
        trackItem.type === "audio" &&
        audioIndex < baseAudioUrls.length
      ) {
        const oldSrc = trackItem.details.src;
        trackItem.details.src = baseAudioUrls[audioIndex];
        console.log(
          `🔄 Replaced audio blob URL [${itemId}]:\n  From: ${oldSrc}\n  To: ${baseAudioUrls[audioIndex]}`
        );
        audioIndex++;
      } else {
        console.warn(
          `⚠️ No permanent URL available for ${trackItem.type} blob [${itemId}]: ${src}`
        );
      }
    } else {
      // Not a blob URL, keep as is
      console.log(
        `✓ Keeping permanent URL for ${trackItem.type} [${itemId}]: ${src}`
      );
    }
  }

  console.log("✅ Blob URL replacement complete:", {
    videosReplaced: videoIndex,
    imagesReplaced: imageIndex,
    audiosReplaced: audioIndex,
  });

  return newData;
}

interface TemplateStore {
  templates: TemplateType[];
  currentTemplate: TemplateType | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchTemplates: (accessToken: string) => Promise<void>;
  fetchTemplate: (
    id: string,
    accessToken: string
  ) => Promise<TemplateType | null>;
  saveTemplate: (
    payload: TemplatePayload,
    accessToken: string,
    isUpdate?: boolean,
    templateId?: string
  ) => Promise<TemplateType | null>;
  deleteTemplate: (id: string, accessToken: string) => Promise<boolean>;
  setCurrentTemplate: (template: TemplateType | null) => void;
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
      console.log("Fetching all templates from API");
      const apiTemplates = await getTemplatesFromAPI(accessToken);

      if (!Array.isArray(apiTemplates)) {
        console.error("API did not return an array:", apiTemplates);
        set({
          error: "Invalid response format from API",
          loading: false,
        });
        return;
      }

      // Transform API templates to TemplateType format (full API JSON format)
      const transformedTemplates: TemplateType[] = apiTemplates.map(
        (t: any) => {
          // Get base URL arrays
          const baseVideoUrls = Array.isArray(t.base_video_url)
            ? t.base_video_url
            : [];
          const baseImageUrls = Array.isArray(t.base_image_url)
            ? t.base_image_url
            : [];
          const baseAudioUrls = Array.isArray(t.base_audio_url)
            ? t.base_audio_url
            : [];

          // Extract template_json
          let templateJson = t.template_json || {};

          // Replace blob URLs in template_json.design if it exists
          if (templateJson.design) {
            templateJson = {
              ...templateJson,
              design: replaceBlobUrlsWithPermanentUrls(
                templateJson.design,
                baseVideoUrls,
                baseImageUrls,
                baseAudioUrls
              ),
            };
          } else if (
            typeof templateJson === "object" &&
            templateJson !== null
          ) {
            // If template_json is the design itself, wrap it
            templateJson = {
              design: replaceBlobUrlsWithPermanentUrls(
                templateJson,
                baseVideoUrls,
                baseImageUrls,
                baseAudioUrls
              ),
              options: {
                fps: 30,
                format: "mp4",
              },
            };
          }

          // Return full API format
          return {
            id: t.id || t._id,
            company_id: t.company_id || null,
            template_name: t.template_name || t.name || "Untitled Template",
            category: t.category || "general",
            base_video_url: baseVideoUrls,
            base_image_url: baseImageUrls,
            base_audio_url: baseAudioUrls,
            duration: t.duration || 0,
            trim: t.trim || { start: 0, end: 0 },
            template_json: templateJson,
            status: t.status || "active",
            created_at: t.created_at || t.createdAt || new Date().toISOString(),
            updated_at: t.updated_at || t.updatedAt || new Date().toISOString(),
          };
        }
      );

      // console.log("Transformed templates:", transformedTemplates);
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
    console.log("🔄 fetchTemplate called with ID:", id);
    const currentState = get();

    // Only clear currentTemplate if we're fetching a different template
    if (currentState.currentTemplate?.id !== id) {
      console.log("🔄 Different template ID, clearing current template");
      set({ loading: true, error: null, currentTemplate: null });
    } else {
      console.log("🔄 Same template ID, keeping current template during fetch");
      set({ loading: true, error: null });
    }

    try {
      const apiTemplate = await getTemplateFromAPI(id, accessToken);
      console.log("📥 API Template Response:", apiTemplate);

      if (!apiTemplate) {
        console.warn("No template returned from API");
        set({ loading: false, currentTemplate: null });
        return null;
      }

      // Extract template data - API returns { design: {...}, options: {...} }
      // We need to extract just the design part for the editor
      let templateData = null;

      // Handle different API response structures
      if (apiTemplate.template_json) {
        // Check if template_json has the nested structure
        if (apiTemplate.template_json.design) {
          // New format: { design: {...}, options: {...} }
          templateData = apiTemplate.template_json.design;
          console.log("Using nested design structure");
        } else if (typeof apiTemplate.template_json === "object") {
          // Old format: template_json is the design itself
          templateData = apiTemplate.template_json;
          console.log("Using flat template_json structure");
        }
      } else if (apiTemplate.template?.template_json) {
        // Handle nested response structure
        if (apiTemplate.template.template_json.design) {
          templateData = apiTemplate.template.template_json.design;
          console.log("Using nested template.template_json.design structure");
        } else {
          templateData = apiTemplate.template.template_json;
          console.log("Using nested template.template_json structure");
        }
      } else if (apiTemplate.templateData) {
        templateData = apiTemplate.templateData;
        console.log("Using templateData field");
      }

      if (!templateData) {
        console.error("No template data found in API response:", apiTemplate);
        set({
          error: "Template data is missing or invalid",
          loading: false,
          currentTemplate: null,
        });
        return null;
      }

      console.log("Extracted template data:", templateData);

      // Replace blob URLs with permanent URLs from base arrays
      // Handle both direct and nested response structures
      const baseVideoUrls = Array.isArray(apiTemplate.base_video_url)
        ? apiTemplate.base_video_url
        : Array.isArray(apiTemplate.template?.base_video_url)
        ? apiTemplate.template.base_video_url
        : [];
      const baseImageUrls = Array.isArray(apiTemplate.base_image_url)
        ? apiTemplate.base_image_url
        : Array.isArray(apiTemplate.template?.base_image_url)
        ? apiTemplate.template.base_image_url
        : [];
      const baseAudioUrls = Array.isArray(apiTemplate.base_audio_url)
        ? apiTemplate.base_audio_url
        : Array.isArray(apiTemplate.template?.base_audio_url)
        ? apiTemplate.template.base_audio_url
        : [];

      console.log("📦 Base URLs from API:", {
        videos: baseVideoUrls.length,
        images: baseImageUrls.length,
        audios: baseAudioUrls.length,
      });

      // Replace blob URLs in template data
      const templateDataWithPermanentUrls = replaceBlobUrlsWithPermanentUrls(
        templateData,
        baseVideoUrls,
        baseImageUrls,
        baseAudioUrls
      );

      // Transform API template to TemplateType format (full API JSON format)
      // Handle both direct and nested response structures
      const templateObj = apiTemplate.template || apiTemplate;

      // Build template_json with replaced URLs
      let templateJson = apiTemplate.template_json || {};
      if (templateJson.design) {
        templateJson = {
          ...templateJson,
          design: templateDataWithPermanentUrls,
        };
      } else {
        templateJson = {
          design: templateDataWithPermanentUrls,
          options: templateJson.options || {
            fps: templateDataWithPermanentUrls.fps || 30,
            format: "mp4",
          },
        };
      }

      const transformedTemplate: TemplateType = {
        id: templateObj.id || apiTemplate.id || apiTemplate._id || id,
        company_id: templateObj.company_id || apiTemplate.company_id || null,
        template_name:
          templateObj.template_name ||
          apiTemplate.template_name ||
          templateObj.name ||
          apiTemplate.name ||
          "Untitled Template",
        category: templateObj.category || apiTemplate.category || "general",
        base_video_url: baseVideoUrls,
        base_image_url: baseImageUrls,
        base_audio_url: baseAudioUrls,
        duration: templateObj.duration || apiTemplate.duration || 0,
        trim: templateObj.trim || apiTemplate.trim || { start: 0, end: 0 },
        template_json: templateJson,
        status: templateObj.status || apiTemplate.status || "active",
        created_at:
          templateObj.created_at ||
          apiTemplate.created_at ||
          templateObj.createdAt ||
          apiTemplate.createdAt ||
          new Date().toISOString(),
        updated_at:
          templateObj.updated_at ||
          apiTemplate.updated_at ||
          templateObj.updatedAt ||
          apiTemplate.updatedAt ||
          new Date().toISOString(),
      };

      console.log("✅ Transformed template:", transformedTemplate);
      console.log("📊 Template data structure:", {
        hasTemplateJson: !!transformedTemplate.template_json,
        hasDesign: !!transformedTemplate.template_json?.design,
        designKeys: transformedTemplate.template_json?.design
          ? Object.keys(transformedTemplate.template_json.design)
          : [],
      });

      set({ currentTemplate: transformedTemplate, loading: false });
      console.log("💾 Store updated - currentTemplate set");
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

      // Get base URL arrays
      const baseVideoUrls = Array.isArray(result.base_video_url)
        ? result.base_video_url
        : [];
      const baseImageUrls = Array.isArray(result.base_image_url)
        ? result.base_image_url
        : [];
      const baseAudioUrls = Array.isArray(result.base_audio_url)
        ? result.base_audio_url
        : [];

      // Extract and replace blob URLs in template_json
      let templateJson = result.template_json || {};
      if (templateJson.design) {
        templateJson = {
          ...templateJson,
          design: replaceBlobUrlsWithPermanentUrls(
            templateJson.design,
            baseVideoUrls,
            baseImageUrls,
            baseAudioUrls
          ),
        };
      } else if (typeof templateJson === "object" && templateJson !== null) {
        templateJson = {
          design: replaceBlobUrlsWithPermanentUrls(
            templateJson,
            baseVideoUrls,
            baseImageUrls,
            baseAudioUrls
          ),
          options: templateJson.options || {
            fps: 30,
            format: "mp4",
          },
        };
      }

      // Transform to TemplateType format (full API JSON format)
      const savedTemplate: TemplateType = {
        id: result.id || result._id,
        company_id: result.company_id || null,
        template_name:
          result.template_name || result.name || "Untitled Template",
        category: result.category || "general",
        base_video_url: baseVideoUrls,
        base_image_url: baseImageUrls,
        base_audio_url: baseAudioUrls,
        duration: result.duration || 0,
        trim: result.trim || { start: 0, end: 0 },
        template_json: templateJson,
        status: result.status || "active",
        created_at:
          result.created_at || result.createdAt || new Date().toISOString(),
        updated_at:
          result.updated_at || result.updatedAt || new Date().toISOString(),
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

      // Refetch templates from API to ensure consistency
      // Preserve currentTemplate if it's the one we just saved
      const currentTemplateId = get().currentTemplate?.id;
      try {
        await get().fetchTemplates(accessToken);
        // Restore currentTemplate if it was the one we just saved
        if (currentTemplateId === savedTemplate.id) {
          set({ currentTemplate: savedTemplate });
        }
      } catch (refetchError) {
        console.warn("Failed to refetch templates after save:", refetchError);
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

      // Refetch templates from API to ensure consistency
      try {
        await get().fetchTemplates(accessToken);
      } catch (refetchError) {
        console.warn("Failed to refetch templates after delete:", refetchError);
      }

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

  setCurrentTemplate: (template: TemplateType | null) => {
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
