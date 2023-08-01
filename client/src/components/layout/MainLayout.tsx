import React from 'react';
import { MainLayoutProps } from './types';
import Footer from '../common/Footer';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='md:container md:mx-auto md:py-12 mx-2 py-8'>
            <div className='flex justify-center'>
                <main className='min-h-screen'>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
