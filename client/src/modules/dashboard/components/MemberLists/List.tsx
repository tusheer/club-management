import React from 'react';
import Image from 'next/image';
import Button from '../../../common/components/Button';
import { IMember } from '../../../../types/Member';

interface IList {
    member: IMember;
    onSelect: (value: IMember) => void;
}

const List: React.FC<IList> = ({ member, onSelect }) => {
    return (
        <div className='rounded bg-white w-full gap-6  flex justify-between items-center mb-5 shadow-sm px-5 py-4'>
            <div className='w-24 border h-24 relative rounded overflow-hidden flex-shrink-0'>
                <Image src={`${process.env.S3_URL}${member.avatar.url}`} layout='fill' priority />
            </div>
            <div className='flex w-10/12'>
                <div className='w-72'>
                    <div className='mb-1.5 flex gap-2'>
                        <p className='font-semibold text-sm text-cm-purple-700 '>{member.uid}</p>
                        <div className='text-white font-semibold bg-cm-yellow-500 rounded  self-center text-xs px-1'>
                            {member.membershipType}
                        </div>
                    </div>

                    <h5 className='font-semibold mb-1.5 text-cm-gray-800'>{member.firstName + ' ' + member.lastName}</h5>
                    <p className='text-cm-gray-600'>{member.occupation}</p>
                </div>
                <div className='w-4/12'>
                    <p className='text-sm  text-cm-gray-500 mb-2'>Contact</p>
                    <h6 className=' font-medium mb-1.5 text-cm-gray-800'>{member.number}</h6>
                    <h6 className='font-medium text-cm-gray-800'>{member.email}</h6>
                </div>
                <div className='w-3/12'>
                    <p className='text-sm  text-cm-gray-500 mb-2'>Regetration Date</p>
                    <h6 className='font-medium text-cm-gray-800'>{member.createdAt}</h6>
                </div>
            </div>

            <Button onClick={() => onSelect(member)} size='md'>
                Edit
            </Button>
        </div>
    );
};

export default List;
