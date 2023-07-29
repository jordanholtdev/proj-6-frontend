export const sanitizeFilename = (fileName: string): string => {
    // remove potentially dangerous characters from the file name
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_.]/g, '_');

    // Limit the filename length to 128 characters
    const maxLength = 128;
    if (sanitizedFileName.length > maxLength) {
        const fileNameParts = sanitizedFileName.split('.');
        const fileExtension = fileNameParts.pop();
        const fileName = fileNameParts.join('.');
        const extension = fileExtension ? `.${fileExtension}` : '';
        return fileName.substr(0, maxLength - extension.length) + extension;
    }
    return sanitizedFileName;
};

export const generateS3Key = (originalFileName: string, userId: string) => {
    const uniqueId = Date.now().toString(36); // Generate a unique identifier (timestamp-based in this example)
    const randomString = Math.random().toString(36).substring(2);
    const uniqueIdWithRandomString = uniqueId + randomString;
    const sanitizedFileName = sanitizeFilename(originalFileName);

    // Combine original file name, unique identifier, and user ID
    const s3Key = `${sanitizedFileName}_${uniqueIdWithRandomString}_${userId}`;

    return s3Key;
};
