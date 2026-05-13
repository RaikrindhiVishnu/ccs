/**
 * Utility to simulate uploading a file to an AWS S3 presigned URL.
 * In a real implementation, this would perform a PUT request to the provided URL.
 */
export async function uploadToPresignedUrl(file: File): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock S3 URL return
    // In production, this would be the final URL after a successful PUT request
    const mockUrl = `https://glc-documents.s3.ap-south-1.amazonaws.com/agents/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    
    console.log(`[Mock Upload] Success: ${file.name} -> ${mockUrl}`);
    return mockUrl;
}
