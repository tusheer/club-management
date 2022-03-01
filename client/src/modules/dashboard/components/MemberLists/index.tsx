import React from 'react';
import List from './List';
import ListBar from './ListBar';

const MemberLists = () => {
    return (
        <div className='relative bg-cm-gray-200 min-h-screen'>
            <ListBar />
            <div className='max-w-6xl px-5 mx-auto relative'>
                <List />
            </div>
        </div>
    );
};

export default MemberLists;
