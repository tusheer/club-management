import Link from 'next/link';
import React from 'react';
import Form from './Form';

const Signup = () => {
    return (
        <div className='w-full pb-5'>
            <div className='max-w-xl px-5 pt-28  w-full '>
                <h1 className='text-cm-purple-700 mb-4'>Signup</h1>
                <h4 className='mb-12'>
                    Already have an account?
                    <Link href='/'>
                        <a>
                            <span className='text-cm-purple-700 text-xl font-semibold ml-1'>Signin</span>
                        </a>
                    </Link>
                </h4>
                <Form />
            </div>
        </div>
    );
};

export default Signup;
