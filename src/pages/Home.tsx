import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import AuthStatus from '../components/auth/AuthStatus';
import { AuthProvider } from '../components/auth/AuthProvider';

const Home: React.FC = () => {
    return (
        <MainLayout>
            <AuthProvider>
                <AuthLayout>
                    <h1>Distributed Image Processing application.</h1>
                    <AuthStatus />
                    <Signup />
                    <Login />
                </AuthLayout>
            </AuthProvider>
        </MainLayout>
    );
};

export default Home;
