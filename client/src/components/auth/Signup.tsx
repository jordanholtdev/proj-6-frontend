import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserPool from '../../utils/UserPool';
import { getErrorMessage } from './utils';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState<null | string>(
        null
    );
    const [reistrationSuccess, setRegistrationSuccess] = useState(false);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], [], (err) => {
            if (err) {
                const processedError = getErrorMessage(err);
                setRegistrationError(processedError || 'Failed to sign up!');
            }
        });

        setRegistrationSuccess(true);
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
                            className='block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                            className='block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {registrationError && (
                        <div className='mt-2 text-red-500'>
                            {registrationError}
                        </div>
                    )}
                    {reistrationSuccess && (
                        <div className='mt-2 text-green-500'>
                            Successfully registered! Please check your email to
                            verify your account. Then you can{' '}
                            <Link
                                to='/login'
                                className='font-medium text-indigo-600'
                            >
                                sign in here
                            </Link>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Sign Up
                    </button>
                </div>
                <div>
                    Already have an account?{' '}
                    <Link to='/login' className='font-medium text-indigo-600'>
                        Sign in now!
                    </Link>{' '}
                </div>
            </form>
        </div>
    );
};

export default Signup;
