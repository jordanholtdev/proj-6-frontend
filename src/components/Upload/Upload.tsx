import { ChangeEvent, FormEvent, useState } from 'react';
import { main } from '../../utils/s3';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [s3Key, setS3Key] = useState('');

    const sanitizeFilename = (fileName: string): string => {
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

    const generateS3Key = (originalFileName: string, userId: string) => {
        const uniqueId = Date.now().toString(36); // Generate a unique identifier (timestamp-based in this example)
        const sanitizedFileName = sanitizeFilename(originalFileName);

        // Combine original file name, unique identifier, and user ID
        const s3Key = `${sanitizedFileName}_${uniqueId}_${userId}`;

        return s3Key;
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Get the selected file

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            const userId = 'user123'; // Replace with the actual authorized user ID
            const fileNameKey = generateS3Key(file.name, userId);
            setS3Key(fileNameKey);

            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                alert('Only JPEG and PNG images are allowed.');
                setSelectedFile(null);
                return;
            }

            // Validate file size
            if (file.size > maxFileSize) {
                alert(
                    'The selected image exceeds the maximum file size limit of 5MB.'
                );
                setSelectedFile(null);
                return;
            }

            // Sanitize file name
            const sanitizedFileName = sanitizeFilename(file.name);
            const sanitizedFile = new File([file], sanitizedFileName, {
                type: file.type,
            });
            setSelectedFile(sanitizedFile);
        }
        setSelectedFile(file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (selectedFile) {
            try {
                setLoading(true);
                const response = await main(
                    s3Key,
                    selectedFile,
                    'images-bucket-project6'
                );
                console.log(response);
                // Handle success response
            } catch (error) {
                console.log(error);
                // Handle error
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className='max-w-xl'>
            <form onSubmit={handleSubmit}>
                <label className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
                    {selectedFile && (
                        <div>
                            <p>Selected File: {selectedFile.name}</p>
                            <button
                                type='button'
                                onClick={() => setSelectedFile(null)}
                                className='px-2 py-1 mt-4 text-white bg-orange-600 rounded-md hover:bg-orange-500'
                            >
                                Clear Selection
                            </button>
                        </div>
                    )}
                    <span className='flex items-center space-x-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 text-gray-600'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                            />
                        </svg>
                        <span className='font-medium text-gray-600'>
                            Drop files to Attach, or {''}
                            <span className='text-blue-600 underline'>
                                browse
                            </span>
                        </span>
                    </span>
                    <input
                        type='file'
                        name='file_upload'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </label>

                <div>
                    <button
                        className='px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500'
                        type='submit'
                    >
                        {loading ? 'Uploading...' : 'Submit'}{' '}
                        {/* Display loading text if loading */}
                    </button>
                    {loading && <span>Loading...</span>}{' '}
                    {/* Display a loading message or spinner */}
                </div>
            </form>
        </div>
    );
};

export default Upload;
