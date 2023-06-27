import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

const Upload: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <h1>Upload Image</h1>
            </AuthLayout>
        </MainLayout>
    );
};

export default Upload;
