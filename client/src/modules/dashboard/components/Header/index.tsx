import React from 'react';
import HeaderWrapper from '../../../common/components/HeaderWrapper';
const Header = () => {
    return (
        <HeaderWrapper height={96}>
            <div className='max-w-6xl px-5 mx-auto h-full flex items-center'>
                <h1 className='text-white'>Club Manage</h1>
            </div>
        </HeaderWrapper>
    );
};

export default Header;
