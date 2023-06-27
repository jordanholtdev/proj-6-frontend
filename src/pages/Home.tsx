import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <div className='text-center'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                    Distributed Image Processing application.
                </h1>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                    Welcome to our distributed image processing application,
                    where the power of collaborative computing meets the
                    artistry of image manipulation.{' '}
                </p>
            </div>
            <div className='text-center py-12'>
                <Link
                    to='/login'
                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Get Started
                </Link>
            </div>
        </MainLayout>
    );
};

export default HomePage;
