import React, { ReactChild } from 'react';

interface IFormWraper {
    children: ReactChild;
}

const FormWraper: React.FC<IFormWraper> = ({ children }) => {
    return (
        <div className='flex gap-28'>
            <div className='max-w-xs sticky top-0 h-screen bg-cm-purple-700 block w-full'>
                <img className='object-cover h-full absolute  bottom-0 top-0' src='/static/assets/images/login-reg-bg.svg' alt='' />
            </div>
            {children}
        </div>
    );
};

export default FormWraper;
