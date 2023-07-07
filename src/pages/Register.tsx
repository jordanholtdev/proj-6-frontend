import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Signup from '../components/auth/Signup';
import { CpuChipIcon } from '@heroicons/react/24/outline';

const RegisterPage: React.FC = () => {
    return (
        <MainLayout>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <CpuChipIcon className='mx-auto h-12 w-auto text-indigo-600' />
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Register to create an account
                    </h2>
                </div>
                <Signup />
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
