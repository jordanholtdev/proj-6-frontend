import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import Signup from '../components/auth/Signup';

const Home: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <h1>Distributed Image Processing application.</h1>
                <Signup />
            </AuthLayout>
        </MainLayout>
    );
};

export default Home;
