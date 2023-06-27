import React, { useState } from 'react';
import UserPool from '../../utils/UserPool';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        UserPool.signUp(
            email,
            password,
            [],
            [],
            (err: unknown, data: unknown) => {
                if (err) console.error(err);
                console.log(data);
            }
        );
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Sign Up
                </h2>
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Email
                    </label>
                    <input
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Password
                    </label>
                    <input
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
