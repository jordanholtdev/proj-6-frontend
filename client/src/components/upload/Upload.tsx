import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateS3Key, sanitizeFilename } from './utils';
import { UploadState } from './types'; // Import the TypeScript types
import { AuthContext } from '../auth/AuthProvider';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Dialog } from '@headlessui/react';

const Upload = () => {
    const [selectedFile, setSelectedFile] =
        useState<UploadState['selectedFile']>(null);
    const [loading, setLoading] = useState<UploadState['loading']>(false);
    const [s3Key, setS3Key] = useState<UploadState['s3Key']>('');
    const [userId, setUserId] = useState<UploadState['userId']>('');
    const [success, setSuccess] = useState<UploadState['success']>(false);
    const { getSession } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getSession().then(
            (session) => {
                if (session) {
                    const cognitoUserSession = session as CognitoUserSession;
                    const cognitoUser = cognitoUserSession
                        .getIdToken()
                        .decodePayload();
                    setUserId(cognitoUser['sub']);
                }
            },
            () => {
                console.log('No session');
            }
        );
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSuccess(false);
        const file = event.target.files?.[0] || null; // Get the selected file

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxFileSize = 5 * 1024 * 1024; // 5MB
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

    const uploadToServer = async (
        file: File,
        key: string,
        userId: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', key);
        formData.append('userId', userId);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return await response.json();
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (selectedFile) {
            try {
                setLoading(true);
                const response = await uploadToServer(
                    selectedFile,
                    s3Key,
                    userId
                );
                console.log(response);

                setSuccess(true);
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
            <Dialog open={success} onClose={() => setSuccess(false)}>
                <div className='fixed inset-0 bg-black/60' aria-hidden='true' />
                <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <Dialog.Panel className='bg-slate-200 p-8 rounded-md'>
                        <Dialog.Title className='text-green-700 text-xl'>
                            Success!
                        </Dialog.Title>
                        <Dialog.Description>
                            Your image was uploaded successfully.
                        </Dialog.Description>
                        <p className='py-2'>
                            To view your image click{' '}
                            <button
                                className='text-blue-600 underline'
                                onClick={() => navigate('/images')}
                            >
                                here
                            </button>{' '}
                        </p>
                        <button
                            className='text-gray-600'
                            onClick={() => setSuccess(false)}
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default Upload;
