export interface TemplateType {
  id: string;
  company_id?: string | null;
  template_name: string;
  category: string;
  preview_image_url?: string | null;
  base_video_url?: string | string[] | null;
  base_image_url?: string | string[] | null;
  base_audio_url?: string | string[] | null;
  duration: number;
  trim?: {
    start: number;
    end: number;
  };
  template_json: any;
  status: "active" | "inactive" | "deleted";
  created_at: string;
  updated_at: string;
}
