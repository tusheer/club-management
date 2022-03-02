import React, { useEffect } from 'react';
import List from './List';
import ListBar from './ListBar';
import { fetchMembers } from '../../../../reducers/membersReducer';
import { useAppDispatch } from '../../../common/hooks';
import { useAppSelector } from '../../../../store';
import Spinner from '../../../common/components/Spinner';
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll';

const MemberLists = () => {
    const dispatch = useAppDispatch();
    const { loading, members, meta, paginationLoading } = useAppSelector((state) => state.members);

    useEffect(() => {
        if (!members.length) {
            dispatch(fetchMembers({ limit: 6, offset: 0 }));
        }
    }, []);

    useInfiniteScroll({
        totalCount: meta?.count || 0,
        limit: 6,
        offset: members.length,
        fetchAction: ({ limit, offset }) => {
            if (!paginationLoading && !loading) {
                dispatch(fetchMembers({ limit, offset }));
            }
        },
    });

    return (
        <div className='relative bg-cm-gray-200 pb-8 min-h-screen'>
            <ListBar />
            {loading ? (
                <Spinner className='mt-40' />
            ) : (
                <div className='max-w-6xl px-5 mx-auto relative'>
                    {members.map((member) => {
                        return <List member={member} />;
                    })}
                    {paginationLoading ? <Spinner className="mt-10" /> : null}
                </div>
            )}
        </div>
    );
};

export default MemberLists;
