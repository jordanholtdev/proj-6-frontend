import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import Upload from '../components/upload/Upload';

const UploadPage: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <div className='mx-auto max-w-2xl py-12 sm:py-48 lg:py-12'>
                        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            Upload an image to process
                        </h1>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua.
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
