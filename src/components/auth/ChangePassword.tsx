import React, { useState } from 'react';
import Pool from '../../utils/UserPool';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // get current user from Pool and set new password
        const user = Pool.getCurrentUser();
        if (user) {
            console.log('user found', user);
            // get user attributes
            // eslint-disable-next-line
            user.getSession((err: any, session: any) => {
                if (err) {
                    console.log('error getting session', err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
                // get user attributes
                user.getUserAttributes((err) => {
                    if (err) {
                        console.log('error getting user attributes', err);
                        return;
                    }
                    // change password
                    user.changePassword(
                        password,
                        newPassword,
                        (err, result) => {
                            if (err) {
                                console.log('error changing password', err);
                                return;
                            } else {
                                console.log('password changed', result);
                            }
                        }
                    );
                });
            });
        } else {
            console.log('No user found');
        }
    };
    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={onSubmit} className='space-y-6'>
                <div>
                    <label
                        htmlFor='email'
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
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        New Password
                    </label>
                    <div className='mt-2'>
                        <input
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
