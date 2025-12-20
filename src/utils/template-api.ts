/**
 * Template API utilities for saving templates to backend
 */

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
}

/**
 * Get the base URL for API calls
 */
function getBaseURL(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
}

/**
 * Upload a blob URL to get a permanent URL
 */
async function uploadBlobUrl(
  blobUrl: string,
  fileType: "video" | "image" | "audio"
): Promise<string | null> {
  try {
    // Fetch the blob
    const response = await fetch(blobUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch blob: ${blobUrl}`);
      return null;
    }

    const blob = await response.blob();

    // Create a File object from the blob
    const fileName = `upload.${
      fileType === "video" ? "mp4" : fileType === "audio" ? "mp3" : "jpg"
    }`;
    const file = new File([blob], fileName, { type: blob.type });

    // Upload using the media upload API
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_id", "default_company");

    const uploadResponse = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      console.warn(`Failed to upload blob: ${error.error || "Unknown error"}`);
      return null;
    }

    const media = await uploadResponse.json();

    // Return the full URL
    const baseUrl = getBaseURL();
    return `${baseUrl}${media.file_url}`;
  } catch (error) {
    console.error(`Error uploading blob URL ${blobUrl}:`, error);
    return null;
  }
}

/**
 * Extract base media URLs from template data and upload blob URLs
 * Returns arrays of all media URLs for each type
 */
export async function extractAndUploadMediaUrls(templateData: any): Promise<{
  base_video_url: string[];
  base_image_url: string[];
  base_audio_url: string[];
}> {
  const trackItemsMap = templateData.trackItemsMap || {};
  const baseVideoUrls: string[] = [];
  const baseImageUrls: string[] = [];
  const baseAudioUrls: string[] = [];

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
        const uploadedUrl = await uploadBlobUrl(src, "video");
        if (uploadedUrl) {
          baseVideoUrls.push(uploadedUrl);
        } else {
          baseVideoUrls.push(src); // Fallback to blob URL
        }
      } else {
        baseVideoUrls.push(src);
      }
    } catch (error) {
      console.warn("Failed to upload video blob, using original URL:", error);
      baseVideoUrls.push(src);
    }
  }

  for (const src of Array.from(imageUrls)) {
    const isBlob = src.startsWith("blob:");
    try {
      if (isBlob) {
        const uploadedUrl = await uploadBlobUrl(src, "image");
        if (uploadedUrl) {
          baseImageUrls.push(uploadedUrl);
        } else {
          baseImageUrls.push(src);
        }
      } else {
        baseImageUrls.push(src);
      }
    } catch (error) {
      console.warn("Failed to upload image blob, using original URL:", error);
      baseImageUrls.push(src);
    }
  }

  for (const src of Array.from(audioUrls)) {
    const isBlob = src.startsWith("blob:");
    try {
      if (isBlob) {
        const uploadedUrl = await uploadBlobUrl(src, "audio");
        if (uploadedUrl) {
          baseAudioUrls.push(uploadedUrl);
        } else {
          baseAudioUrls.push(src);
        }
      } else {
        baseAudioUrls.push(src);
      }
    } catch (error) {
      console.warn("Failed to upload audio blob, using original URL:", error);
      baseAudioUrls.push(src);
    }
  }

  return {
    base_video_url: baseVideoUrls,
    base_image_url: baseImageUrls,
    base_audio_url: baseAudioUrls,
  };
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
  category?: string
): Promise<TemplatePayload> {
  // Extract and upload media URLs
  const mediaUrls = await extractAndUploadMediaUrls(templateData);

  // Calculate duration and trim times
  const duration = calculateDuration(templateData);
  const trim = extractTrimTimes(templateData);

  return {
    template_name: templateName,
    category: category || undefined,
    base_video_url: mediaUrls.base_video_url,
    base_image_url: mediaUrls.base_image_url,
    base_audio_url: mediaUrls.base_audio_url,
    duration,
    trim,
    template_json: templateData,
  };
}

/**
 * Save template to backend API (POST for new templates)
 */
export async function saveTemplateToAPI(
  payload: TemplatePayload
): Promise<any> {
  const baseURL = getBaseURL();
  const apiUrl = `${baseURL}/api/templates`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  payload: TemplatePayload
): Promise<any> {
  const baseURL = getBaseURL();
  const apiUrl = `${baseURL}/api/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
export async function getTemplateFromAPI(templateId: string): Promise<any> {
  const baseURL = getBaseURL();
  const apiUrl = `${baseURL}/api/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
export async function getTemplatesFromAPI(): Promise<any[]> {
  const baseURL = getBaseURL();
  const apiUrl = `${baseURL}/api/templates`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
