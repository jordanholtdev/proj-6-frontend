import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';

const AuthStatus: React.FC = () => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AuthContext);

    useEffect(() => {
        getSession().then(
            (session) => {
                if (session) setStatus(true);
            },
            () => {
                setStatus(false);
            }
        );
    });
    return (
        <div>
            <h2>Status</h2>
            <p>
                {status ? (
                    <button
                        onClick={logout}
                        className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    >
                        Logout
                    </button>
                ) : (
                    'Please login'
                )}
            </p>
        </div>
    );
};

export default AuthStatus;
