import React from 'react';
import { MainLayoutProps } from './types';
import Footer from '../common/Footer';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='md:container md:mx-auto'>
            <main className='min-h-screen'>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
