export interface TemplateType {
  id: string;
  company_id?: string | null;
  template_name: string;
  category: string;
  preview_image_url?: string | null;
  base_video_url: string[];
  base_image_url: string[];
  base_audio_url: string[];
  duration: number;
  trim: {
    start: number;
    end: number;
  };
  template_json: any;
  status?: string;
  created_at: string;
  updated_at: string;
}
