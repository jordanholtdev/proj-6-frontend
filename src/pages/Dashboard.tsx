import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

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
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua.
                        </p>
                    </div>
                </div>
            </AuthLayout>
        </MainLayout>
    );
};

export default Dashboard;
