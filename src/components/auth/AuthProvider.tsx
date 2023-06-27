import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession,
} from 'amazon-cognito-identity-js';
import Pool from '../../utils/UserPool';
import { AuthProviderProps, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType>({
    authenticate: async () => {
        // Provide a default implementation or throw an error
        throw new Error('authenticate function not implemented');
    },
    getSession: async () => {
        // Provide a default implementation or throw an error
        throw new Error('getSession function not implemented');
    },
    logout: () => {
        // Provide a default implementation or throw an error
        throw new Error('logout function not implemented');
    },
});

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
    const navigate = useNavigate();
    const getSession = async (): Promise<CognitoUserSession> => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(
                    (err: Error | null, session: CognitoUserSession | null) => {
                        if (err) {
                            reject();
                        } else {
                            resolve(session as CognitoUserSession);
                        }
                    }
                );
            } else {
                reject();
            }
        });
    };

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log('onSuccess:', data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error('onFailure:', err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log('newPasswordRequired:', data);
                    resolve(data);
                },
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();

        if (user) {
            user.signOut();
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
