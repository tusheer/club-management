import React from 'react';
import Image from 'next/image';
import Button from '../../../common/components/Button';
const List = () => {
    return (
        <div className='rounded bg-white w-full gap-6  flex justify-between items-center mb-5 shadow-sm px-5 py-4'>
            <div className='w-24 h-24 relative rounded overflow-hidden flex-shrink-0'>
                <Image
                    src='http://localhost:4000/static/uploads/avatars/1610928615665-1646069759000.jpeg'
                    layout='fill'
                    priority
                    className=''
                />
            </div>
            <div className='flex w-10/12'>
                <div className='w-72'>
                    <div className='mb-1.5 flex gap-2'>
                        <p className='font-semibold text-sm text-cm-purple-700 '>CM-JKFJSKDJ</p>
                        <div className='text-white font-semibold bg-cm-yellow-500 rounded  self-center text-xs px-1'>VIP</div>
                    </div>

                    <h5 className='font-semibold mb-1.5 text-cm-gray-800'>Jane Alam Tusher</h5>
                    <p className='text-cm-gray-600'>Doctor</p>
                </div>
                <div className='w-4/12'>
                    <p className='text-sm  text-cm-gray-500 mb-2'>Contact</p>
                    <h6 className=' font-medium mb-1.5 text-cm-gray-800'>01875378221</h6>
                    <h6 className='font-medium text-cm-gray-800'>tusher@gmail.com</h6>
                </div>
                <div className='w-3/12'>
                    <p className='text-sm  text-cm-gray-500 mb-2'>Regetration Date</p>
                    <h6 className='font-medium text-cm-gray-800'>March 1, 2022</h6>
                </div>
            </div>

            <Button size='md'>Edit</Button>
        </div>
    );
};

export default List;
