import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import RetrieveSQS from '../components/retrieve/RetrieveSQS';

const ImagesPage: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl'>
                        <header className='bg-white shadow'>
                            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                                    Processed Images
                                </h1>
                            </div>
                        </header>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            Welcome to the processed images page! Here, you can
                            view the results of your uploaded images that have
                            been processed using the powerful AWS Rekognition
                            service. Each image has undergone comprehensive
                            analysis, allowing us to detect and identify various
                            elements within the image. Gain valuable insights
                            into the contents of your images and explore the
                            detailed labels assigned to them. Take a closer look
                            at the results and delve into the fascinating world
                            of image recognition.
                        </p>
                    </div>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <RetrieveSQS />
                    </div>
                </div>
            </AuthLayout>
        </MainLayout>
    );
};

export default ImagesPage;
