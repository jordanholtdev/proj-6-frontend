import { ChangeEvent, FormEvent, useState } from 'react';
import { main } from '../../utils/s3';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // TODO: Add file upload functionality
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Get the selected file
        setSelectedFile(file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (selectedFile) {
            try {
                const response = await main(
                    'my-file',
                    selectedFile,
                    'images-bucket-project6'
                );
                console.log(response);
                // Handle success response
            } catch (error) {
                console.log(error);
                // Handle error
            }
        }
    };

    return (
        <div className='max-w-xl'>
            <form onSubmit={handleSubmit}>
                <label className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
