import React from 'react';
import Dropdown from '../../../common/components/Dropdown';
import HeaderWrapper, { Icon } from '../../../common/components/HeaderWrapper';
import { useAppSelector } from '../../../common/hooks';

const Header = () => {
    const { meta } = useAppSelector((state) => state.members);

    return (
        <HeaderWrapper height={96}>
            <div className='max-w-6xl justify-between px-5 mx-auto h-full flex items-center'>
                <h1 className='text-white'>Club Members {meta?.count ? '- ' + meta?.count : ''}</h1>
                <div className='w-3/12 h-full flex items-center justify-end'>
                    <div className='flex items-center h-full gap-3'>
                        <Dropdown className='relative select-none'>
                            <Dropdown.Menu>
                                {({ toggle, open }) => (
                                    <div onClick={() => toggle(!open)}>
                                        <Icon>
                                            <img
                                                className='w-4 h-4'
                                                src='/static/assets/icons/three-dot.svg'
                                                alt='home'
                                                width='17px'
                                                height='17px'
                                            />
                                        </Icon>
                                    </div>
                                )}
                            </Dropdown.Menu>
                            <Dropdown.Item>
                                {({}) => (
                                    <div className='absolute mt-3 right-0 p-1 bg-white rounded shadow-xl  w-44'>
                                        <div className='px-5 py-3 cursor-pointer select-none font-medium hover:bg-cm-gray-200'>Logout</div>
                                    </div>
                                )}
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    );
};

export default Header;
