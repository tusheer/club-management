import React, { useEffect } from 'react';
import List from './List';
import ListBar from './ListBar';
import { fetchMembers } from '../../../../reducers/membersReducer';
import { useAppDispatch } from '../../../common/hooks';
import { useAppSelector } from '../../../../store';
import Spinner from '../../../common/components/Spinner';

const MemberLists = () => {
    const dispatch = useAppDispatch();
    const { loading, members, meta, paginationLoading } = useAppSelector((state) => state.members);

    useEffect(() => {
        if (!members.length) {
            dispatch(fetchMembers({ limit: 6, offset: 0 }));
        }
    }, []);
    return (
        <div className='relative bg-cm-gray-200 min-h-screen'>
            <ListBar />
            {loading ? (
                <Spinner />
            ) : (
                <div className='max-w-6xl px-5 mx-auto relative'>
                    {members.map((member) => {
                        return <List member={member} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default MemberLists;
