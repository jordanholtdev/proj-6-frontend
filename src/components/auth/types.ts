import { ReactNode } from 'react';

export interface AuthProviderProps {
    children: ReactNode;
}

export type AuthContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: (Username: string, Password: string) => Promise<any>;
    getSession: () => Promise<object>;
    logout: () => void;
};
