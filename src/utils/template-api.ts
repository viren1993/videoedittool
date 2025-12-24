/**
 * Template API utilities for saving templates to backend
 */
import axios from "axios";
import { DATA_API } from "@/config/constants";
import { generateId } from "@designcombo/timeline";

export interface TemplatePayload {
  template_name: string;
  category?: string;
  base_video_url: string[];
  base_image_url: string[];
  base_audio_url: string[];
  duration: number;
  trim: {
    start: number;
    end: number;
  };
  template_json: any;
  isPrivate?: boolean;
}

/**
 * Upload a blob URL to get a permanent URL using DATA_API
 */

async function uploadBlobUrl(
  blobUrl: string,
  fileType: "video" | "image" | "audio",
  accessToken: string
): Promise<string | null> {
  try {
    if (!DATA_API) {
      console.error("DATA_API is not configured");
      return null;
    }

    // 1. Fetch blob from blob URL
    const response = await fetch(blobUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch blob: ${blobUrl}`);
      return null;
    }

    const blob = await response.blob();

    // 2. Create File from Blob
    const fileName = `upload.${
      fileType === "video" ? "mp4" : fileType === "audio" ? "mp3" : "jpg"
    }`;

    const file = new File([blob], fileName, {
      type: blob.type || "application/octet-stream",
    });

    // 3. Prepare FormData
    const formData = new FormData();
    formData.append("file", file);

    // 4. Upload using axios
    const uploadResponse = await axios.post(
      `${DATA_API}/media-api/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // ❌ Do NOT set Content-Type manually
        },
      }
    );

    // 5. Handle response
    const fileUrl = uploadResponse.data?.media?.file_url;
    if (!fileUrl) {
      console.warn("No file_url in upload response");
      return null;
    }

    return `${DATA_API}/media/${fileUrl}`;
  } catch (error: any) {
    console.error(
      `Error uploading blob URL ${blobUrl}:`,
      error?.response?.data || error
    );
    return null;
  }
}

/**
 * Extract base media URLs from template data and upload blob URLs
 * Returns arrays of all media URLs for each type and a mapping of blob URLs to permanent URLs
 */
export async function extractAndUploadMediaUrls(
  templateData: any,
  accessToken: string
): Promise<{
  base_video_url: string[];
  base_image_url: string[];
  base_audio_url: string[];
  urlMapping: Map<string, string>; // Maps blob URLs to permanent URLs
}> {
  const trackItemsMap = templateData.trackItemsMap || {};
  const baseVideoUrls: string[] = [];
  const baseImageUrls: string[] = [];
  const baseAudioUrls: string[] = [];
  const urlMapping = new Map<string, string>(); // blob URL -> permanent URL

  // Collect all unique media URLs by type
  const videoUrls = new Set<string>();
  const imageUrls = new Set<string>();
  const audioUrls = new Set<string>();

  // First pass: collect all unique URLs
  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;

    if (!trackItem.details?.src) continue;

    const src = trackItem.details.src;

    if (trackItem.type === "video") {
      videoUrls.add(src);
    } else if (trackItem.type === "image") {
      imageUrls.add(src);
    } else if (trackItem.type === "audio") {
      audioUrls.add(src);
    }
  }

  // Second pass: upload blob URLs and collect permanent URLs
  for (const src of Array.from(videoUrls)) {
    const isBlob = src.startsWith("blob:");
    try {
      if (isBlob) {
        const uploadedUrl = await uploadBlobUrl(src, "video", accessToken);
        if (uploadedUrl) {
          baseVideoUrls.push(uploadedUrl);
          urlMapping.set(src, uploadedUrl); // Map blob URL to permanent URL
        } else {
          baseVideoUrls.push(src); // Fallback to blob URL
          urlMapping.set(src, src); // Map to itself
        }
      } else {
        baseVideoUrls.push(src);
        // For non-blob URLs, map to themselves
        urlMapping.set(src, src);
      }
    } catch (error) {
      console.warn("Failed to upload video blob, using original URL:", error);
      baseVideoUrls.push(src);
      urlMapping.set(src, src);
    }
  }

  for (const src of Array.from(imageUrls)) {
    const isBlob = src.startsWith("blob:");
    try {
      if (isBlob) {
        const uploadedUrl = await uploadBlobUrl(src, "image", accessToken);
        if (uploadedUrl) {
          baseImageUrls.push(uploadedUrl);
          urlMapping.set(src, uploadedUrl); // Map blob URL to permanent URL
        } else {
          baseImageUrls.push(src);
          urlMapping.set(src, src);
        }
      } else {
        baseImageUrls.push(src);
        urlMapping.set(src, src);
      }
    } catch (error) {
      console.warn("Failed to upload image blob, using original URL:", error);
      baseImageUrls.push(src);
      urlMapping.set(src, src);
    }
  }

  for (const src of Array.from(audioUrls)) {
    const isBlob = src.startsWith("blob:");
    try {
      if (isBlob) {
        const uploadedUrl = await uploadBlobUrl(src, "audio", accessToken);
        if (uploadedUrl) {
          baseAudioUrls.push(uploadedUrl);
          urlMapping.set(src, uploadedUrl); // Map blob URL to permanent URL
        } else {
          baseAudioUrls.push(src);
          urlMapping.set(src, src);
        }
      } else {
        baseAudioUrls.push(src);
        urlMapping.set(src, src);
      }
    } catch (error) {
      console.warn("Failed to upload audio blob, using original URL:", error);
      baseAudioUrls.push(src);
      urlMapping.set(src, src);
    }
  }

  return {
    base_video_url: baseVideoUrls,
    base_image_url: baseImageUrls,
    base_audio_url: baseAudioUrls,
    urlMapping,
  };
}

/**
 * Replace blob URLs in trackItemsMap with permanent URLs using the mapping
 */
function replaceBlobUrlsInTrackItemsMap(
  trackItemsMap: any,
  urlMapping: Map<string, string>
): any {
  const newTrackItemsMap = JSON.parse(JSON.stringify(trackItemsMap));

  for (const [itemId, item] of Object.entries(newTrackItemsMap)) {
    const trackItem = item as any;
    if (!trackItem.details?.src) continue;

    const src = trackItem.details.src;
    const permanentUrl = urlMapping.get(src);

    if (permanentUrl && permanentUrl !== src) {
      console.log(
        `🔄 Replacing blob URL in trackItemsMap [${itemId}]:\n  From: ${src}\n  To: ${permanentUrl}`
      );
      trackItem.details.src = permanentUrl;
    }
  }

  return newTrackItemsMap;
}

/**
 * Calculate video duration from template data (in seconds)
 */
export function calculateDuration(templateData: any): number {
  const trackItemsMap = templateData.trackItemsMap || {};
  let maxEnd = 0;

  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;
    if (trackItem.display?.to) {
      maxEnd = Math.max(maxEnd, trackItem.display.to);
    }
  }

  // Convert from milliseconds to seconds
  return maxEnd / 1000;
}

/**
 * Extract trim start and end times from template data (in seconds)
 */
export function extractTrimTimes(templateData: any): {
  start: number;
  end: number;
} {
  const trackItemsMap = templateData.trackItemsMap || {};
  let minStart = Infinity;
  let maxEnd = 0;

  // Find the overall timeline bounds
  for (const [itemId, item] of Object.entries(trackItemsMap)) {
    const trackItem = item as any;
    if (trackItem.display?.from !== undefined) {
      minStart = Math.min(minStart, trackItem.display.from);
    }
    if (trackItem.display?.to !== undefined) {
      maxEnd = Math.max(maxEnd, trackItem.display.to);
    }
  }

  // If no items found, return default values
  if (minStart === Infinity) {
    minStart = 0;
  }

  // Convert from milliseconds to seconds
  return {
    start: minStart / 1000,
    end: maxEnd / 1000,
  };
}

/**
 * Transform template data to the new template format
 */
export async function transformToTemplateFormat(
  templateData: any,
  templateName: string,
  accessToken: string,
  category?: string
): Promise<TemplatePayload> {
  // Extract and upload media URLs (this also creates the URL mapping)
  const mediaUrls = await extractAndUploadMediaUrls(templateData, accessToken);

  // Replace blob URLs in trackItemsMap with permanent URLs
  const trackItemsMapWithPermanentUrls = replaceBlobUrlsInTrackItemsMap(
    templateData.trackItemsMap || {},
    mediaUrls.urlMapping
  );

  // Calculate duration and trim times
  const duration = calculateDuration(templateData);
  const trim = extractTrimTimes(templateData);

  // Format template_json according to API structure with permanent URLs
  const templateJson = {
    design: {
      id: templateData.id || generateId(),
      fps: templateData.fps || 30,
      size: templateData.size || { width: 1080, height: 1920 },
      tracks: templateData.tracks || [],
      trackItemsMap: trackItemsMapWithPermanentUrls, // Use trackItemsMap with permanent URLs
      trackItemIds: templateData.trackItemIds || [],
      transitionsMap: templateData.transitionsMap || {},
      transitionIds: templateData.transitionIds || [],
    },
    options: {
      fps: templateData.fps || 30,
      format: "mp4",
    },
  };

  return {
    template_name: templateName,
    category: category || undefined,
    base_video_url: mediaUrls.base_video_url,
    base_image_url: mediaUrls.base_image_url,
    base_audio_url: mediaUrls.base_audio_url,
    duration,
    trim,
    template_json: templateJson,
    isPrivate: true, // Default to private (company-specific)
  };
}

/**
 * Save template to backend API (POST for new templates)
 */
export async function saveTemplateToAPI(
  payload: TemplatePayload,
  accessToken: string
): Promise<any> {
  if (!DATA_API) {
    throw new Error("DATA_API is not configured");
  }

  const apiUrl = `${DATA_API}/templates/`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || `HTTP ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving template to API:", error);
    throw error;
  }
}

/**
 * Update template in backend API (PUT for existing templates)
 */
export async function updateTemplateToAPI(
  templateId: string,
  payload: TemplatePayload,
  accessToken: string
): Promise<any> {
  if (!DATA_API) {
    throw new Error("DATA_API is not configured");
  }

  const apiUrl = `${DATA_API}/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || `HTTP ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating template to API:", error);
    throw error;
  }
}

/**
 * Get a single template from backend API by ID
 */
export async function getTemplateFromAPI(
  templateId: string,
  accessToken: string
): Promise<any> {
  if (!DATA_API) {
    throw new Error("DATA_API is not configured");
  }

  const apiUrl = `${DATA_API}/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || `HTTP ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching template from API:", error);
    throw error;
  }
}

/**
 * Get all templates from backend API
 */
export async function getTemplatesFromAPI(accessToken: string): Promise<any[]> {
  if (!DATA_API) {
    throw new Error("DATA_API is not configured");
  }

  const apiUrl = `${DATA_API}/templates/`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || `HTTP ${response.status}`
      );
    }

    const data = await response.json();
    // Handle both array and object with templates property
    return Array.isArray(data) ? data : data.templates || [];
  } catch (error) {
    console.error("Error fetching templates from API:", error);
    throw error;
  }
}

/**
 * Delete template from backend API
 */
export async function deleteTemplateFromAPI(
  templateId: string,
  accessToken: string
): Promise<boolean> {
  if (!DATA_API) {
    throw new Error("DATA_API is not configured");
  }

  const apiUrl = `${DATA_API}/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || `HTTP ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting template from API:", error);
    throw error;
  }
}
