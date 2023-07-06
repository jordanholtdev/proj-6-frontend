import React from 'react';
import Nav from '../common/Nav';
import { AuthLayoutProps } from './types';

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div>
            <Nav />

            {children}
        </div>
    );
};

export default AuthLayout;
