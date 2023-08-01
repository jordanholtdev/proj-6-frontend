export interface UploadState {
    selectedFile: File | null;
    loading: boolean;
    s3Key: string;
    userId: string;
    success: boolean;
}
