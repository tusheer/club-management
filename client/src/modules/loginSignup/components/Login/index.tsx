import Link from 'next/link';
import React from 'react';
import Form from './Form';

const Login = () => {
    return (
        <div className="w-full pb-5">
            <div className='max-w-xl px-5 pt-28  w-full '>
                <h1 className='text-cm-purple-700 mb-4'>Signin</h1>
                <h4 className='mb-12'>
                    New user?
                    <Link href='/signup'>
                        <a>
                            <span className='text-cm-purple-700 text-xl font-semibold ml-1'>Create a account</span>
                        </a>
                    </Link>
                </h4>
                <Form />
            </div>
        </div>
    );
};

export default Login;
