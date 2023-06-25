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
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
