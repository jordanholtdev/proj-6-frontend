import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

const Dashboard: React.FC = () => {
    return (
        <MainLayout>
            <AuthLayout>
                <h1>Dashboard</h1>
                <p>Welcome back</p>
            </AuthLayout>
        </MainLayout>
    );
};

export default Dashboard;
