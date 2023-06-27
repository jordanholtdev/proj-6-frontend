import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

const LoginPage: React.FC = () => {
    return (
        <MainLayout>
            <h1 className='text-3xl font-bold tracking-tight text-black sm:text-4xl'>
                Register or Login
            </h1>
            <Signup />
            <Login />
        </MainLayout>
    );
};

export default LoginPage;
