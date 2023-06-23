import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

const Home: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <h1>Distributed Image Processing application.</h1>
            </AuthLayout>
        </MainLayout>
    );
};

export default Home;
