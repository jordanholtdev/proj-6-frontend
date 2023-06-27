import React from 'react';
import AuthStatus from '../auth/AuthStatus';
import { AuthLayoutProps } from './types';

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div>
            <AuthStatus />
            {children}
        </div>
    );
};

export default AuthLayout;
