import Image from 'next/image';
import React from 'react';
import HeaderWrapper from '../../common/components/HeaderWrapper';

const DashboardContainer = () => {
    return (
        <React.Fragment>
            <HeaderWrapper height={110}>
                <div className='max-w-5xl mx-auto h-full flex items-center'>
                    <h1 className='text-white'>Club Manage</h1>
                </div>
            </HeaderWrapper>
            <div className='relative bg-cm-gray-200 min-h-screen'>
                <div className='h-10 w-full bg-cm-purple-700 absolute'></div>
                <div className='max-w-5xl mx-auto relative'>
                    
                    <div className='rounded bg-white w-full mb-5 shadow-sm px-5 py-4'>
                        <div className='w-24 h-28 relative rounded overflow-hidden'>
                            <Image
                                src='http://localhost:4000/static/uploads/avatars/1610928615665-1646069759000.jpeg'
                                layout='fill'
                                className=''
                            />
                        </div>
                    </div>
                    <div className='rounded bg-white w-full mb-5 shadow-sm px-5 py-4'>
                        <div className='w-24 h-28 relative rounded overflow-hidden'>
                            <Image
                                src='http://localhost:4000/static/uploads/avatars/1610928615665-1646069759000.jpeg'
                                layout='fill'
                                className=''
                            />
                        </div>
                    </div>
                    <div className='rounded bg-white w-full mb-5 shadow-sm px-5 py-4'>
                        <div className='w-24 h-28 relative rounded overflow-hidden'>
                            <Image
                                src='http://localhost:4000/static/uploads/avatars/1610928615665-1646069759000.jpeg'
                                layout='fill'
                                className=''
                            />
                        </div>
                    </div>
                    <div className='rounded bg-white w-full mb-5 shadow-sm px-5 py-4'>
                        <div className='w-24 h-28 relative rounded overflow-hidden'>
                            <Image
                                src='http://localhost:4000/static/uploads/avatars/1610928615665-1646069759000.jpeg'
                                layout='fill'
                                className=''
                            />
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardContainer;
