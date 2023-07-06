import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import Upload from '../components/upload/Upload';

const UploadPage: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl'>
                        <header className='bg-white shadow'>
                            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                                    Upload an image to process
                                </h1>
                            </div>
                        </header>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            Welcome to our image processing page! Here, you can
                            easily upload your JPEG or PNG images, with a
                            maximum size of 5MB, and we'll take care of the rest
                            using AWS Rekognition. Our powerful service will
                            analyze your image and identify its elements.
                            Whether you're curious about objects, scenes, or
                            concepts within your image, we've got you covered.
                            Simply upload your image, sit back, and let our
                            advanced technology uncover the fascinating details
                            for you.
                        </p>
                    </div>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <Upload />
                    </div>
                </div>
            </AuthLayout>
        </MainLayout>
    );
};

export default UploadPage;
