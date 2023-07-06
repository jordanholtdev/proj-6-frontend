import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ChangePassword from '../components/auth/ChangePassword';

const Dashboard: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl'>
                        <header className='bg-white shadow'>
                            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                                    Dashboard
                                </h1>
                            </div>
                        </header>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            You can update your account's password for enhanced
                            security below. Changing your password regularly is
                            a good practice to protect your personal
                            information. Simply follow the steps below to update
                            your password:
                        </p>
                        <ol className='mt-6 text-lg leading-8 text-gray-600 list-decimal list-inside'>
                            <li> Enter your current password.</li>
                            <li> Enter your new password.</li>
                            <li> Click the "Change Password" button.</li>
                        </ol>
                        <div>
                            <ChangePassword />
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </MainLayout>
    );
};

export default Dashboard;
