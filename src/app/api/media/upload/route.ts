import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

interface MediaUploadResponse {
  id: string;
  company_id: string;
  file_url: string;
  file_type: "image" | "video" | "audio" | "document";
  original_name: string;
  size: number;
  created_at: string;
  updated_at: string;
  status: string;
}

function getFileType(
  contentType: string
): "image" | "video" | "audio" | "document" {
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  if (contentType.startsWith("audio/")) return "audio";
  return "document";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    const company_id = formData.get("company_id") as string || "default_company";
    const buffer = await file.arrayBuffer();
    const size = buffer.byteLength;
    const now = new Date().toISOString();
    const mediaId = nanoid();
    const fileExtension = file.name.split(".").pop();
    
    // Generate file URL - in production, upload to cloud storage
    const file_url = `/uploads/companies/${company_id}/${mediaId}-${file.name}`;
    const file_type = getFileType(file.type);

    const response: MediaUploadResponse = {
      id: mediaId,
      company_id,
      file_url,
      file_type,
      original_name: file.name,
      size,
      created_at: now,
      updated_at: now,
      status: "200 OK",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in media upload route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
