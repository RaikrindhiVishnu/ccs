import { env } from "../config/env";

export type DocType = 'aadhar_front' | 'aadhar_back' | 'pan' | 'profile_image';

export interface UploadResult {
  url: string;      
  cleanUrl: string;
  key: string;
}

const UPLOAD_API_ENDPOINT = `${env.AUTH_API_BASE_URL}/s3/uploadFile`;
export function getS3KeyForUserDoc(email: string, docType: DocType, filename: string): string {
  const cleanEmail = email.trim().toLowerCase();
  const cleanFilename = filename.trim().replace(/\s+/g, '_');
  return `users/${cleanEmail}/documents/${docType}/${cleanFilename}`;
}

export async function uploadFile(file: File, key: string): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('key', key);

  try {
    const response = await fetch(UPLOAD_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    const returnedUrl = data.url;
    if (!returnedUrl) {
      throw new Error("No URL returned in API response");
    }
    const cleanUrl = returnedUrl.split('?')[0];
    const returnedKey = data.key || key;
    return {
      url: returnedUrl,
      cleanUrl,
      key: returnedKey,
    };
  } catch (error) {
    console.error('[File Upload] Error during upload:', error);
    throw error;
  }
}

export async function uploadUserDocument(file: File, email: string, docType: DocType): Promise<UploadResult> {
  const key = getS3KeyForUserDoc(email, docType, file.name);
  return uploadFile(file, key);
}
