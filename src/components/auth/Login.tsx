import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { authenticate } = useContext(AuthContext);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        authenticate(email, password)
            .then((data: object) => {
                console.log('Logged in!', data);
                navigate('/dashboard');
            })
            .catch((err: object) => {
                console.error('Failed to login!', err);
            });
    };
    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={onSubmit} className='space-y-6'>
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Email
                    </label>
                    <div className='mt-2'>
                        <input
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Password
                    </label>
                    <div className='mt-2'>
                        <input
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Sign In
                    </button>
                </div>
                <div>
                    Don't have an account yet?{' '}
                    <Link
                        to='/register'
                        className='font-medium text-indigo-600'
                    >
                        Register Now!
                    </Link>{' '}
                </div>
            </form>
        </div>
    );
};

export default Login;
