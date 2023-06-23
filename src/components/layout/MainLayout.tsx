import React from 'react';
import { MainLayoutProps } from './types';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default MainLayout;
