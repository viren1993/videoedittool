export type UploadProgressCallback = (
  uploadId: string,
  progress: number
) => void;

export type UploadStatusCallback = (
  uploadId: string,
  status: "uploaded" | "failed",
  error?: string
) => void;

export interface UploadCallbacks {
  onProgress: UploadProgressCallback;
  onStatus: UploadStatusCallback;
}

export async function processFileUpload(
  uploadId: string,
  file: File,
  callbacks: UploadCallbacks
): Promise<any> {
  try {
    callbacks.onProgress(uploadId, 10);

    const objectUrl = URL.createObjectURL(file);

    callbacks.onProgress(uploadId, 50);

    const contentType = file.type || "application/octet-stream";
    const fileType = contentType.split("/")[0];

    const uploadData = {
      id: uploadId,
      fileName: file.name,
      filePath: objectUrl,
      fileSize: file.size,
      contentType: contentType,
      metadata: { uploadedUrl: objectUrl },
      folder: null,
      type: fileType,
      method: "local",
      origin: "user",
      status: "uploaded",
      isPreview: false,
      file: file,
      url: objectUrl,
    };

    callbacks.onProgress(uploadId, 100);
    callbacks.onStatus(uploadId, "uploaded");
    return uploadData;
  } catch (error) {
    callbacks.onStatus(uploadId, "failed", (error as Error).message);
    throw error;
  }
}

export async function processUrlUpload(
  uploadId: string,
  url: string,
  callbacks: UploadCallbacks
): Promise<any[]> {
  try {
    callbacks.onProgress(uploadId, 10);

    let contentType = "application/octet-stream";
    const urlLower = url.toLowerCase();

    if (urlLower.match(/\.(mp4|webm|mov|avi|mkv)(\?|$)/i)) {
      contentType = "video/mp4";
    } else if (urlLower.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i)) {
      contentType = "image/jpeg";
    } else if (urlLower.match(/\.(mp3|wav|ogg|aac|flac|m4a)(\?|$)/i)) {
      contentType = "audio/mpeg";
    }

    const fileName = url.split("/").pop()?.split("?")[0] || "file";
    const fileType = contentType.split("/")[0];

    callbacks.onProgress(uploadId, 50);

    const uploadData = {
      id: uploadId,
      fileName: fileName,
      filePath: url,
      fileSize: 0,
      contentType: contentType,
      metadata: { uploadedUrl: url, originalUrl: url },
      folder: null,
      type: fileType,
      method: "url",
      origin: "user",
      status: "uploaded",
      isPreview: false,
      url: url,
    };

    callbacks.onProgress(uploadId, 100);
    callbacks.onStatus(uploadId, "uploaded");
    return [uploadData];
  } catch (error) {
    callbacks.onStatus(uploadId, "failed", (error as Error).message);
    throw error;
  }
}

export async function processUpload(
  uploadId: string,
  upload: { file?: File; url?: string },
  callbacks: UploadCallbacks
): Promise<any> {
  if (upload.file) {
    return await processFileUpload(uploadId, upload.file, callbacks);
  }
  if (upload.url) {
    return await processUrlUpload(uploadId, upload.url, callbacks);
  }
  callbacks.onStatus(uploadId, "failed", "No file or URL provided");
  throw new Error("No file or URL provided");
}
