export type MediaFileType = "image" | "video" | "audio" | "document";

export interface MediaUploadResponse {
  id: string;
  company_id: string;
  file_url: string;
  file_type: MediaFileType;
  original_name: string;
  size: number;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface UploadedMedia extends MediaUploadResponse {
  // Additional fields for template usage
  thumbnail?: string;
  duration?: number;
}
