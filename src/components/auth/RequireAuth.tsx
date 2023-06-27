import { useContext, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const { getSession } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession()
            .then((session) => {
                console.log('Session: ', session);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [getSession]);

    if (isLoading) {
        // Show loading indicator or any other component while checking the session
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace />;
}

export default RequireAuth;
