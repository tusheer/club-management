import React, { useEffect, useState } from 'react';
import List from './List';
import ListBar from './ListBar';
import { IMember } from '../../../../types/Member';
import { fetchMembers } from '../../../../reducers/membersReducer';
import { useAppDispatch } from '../../../common/hooks';
import { useAppSelector } from '../../../../store';
import Spinner from '../../../common/components/Spinner';
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll';
import AddAndEditModal from '../AddAndEditModal';
interface IFromState extends IMember {
    file: File | null;
}
const MemberLists = () => {
    const dispatch = useAppDispatch();
    const { loading, members, meta, paginationLoading } = useAppSelector((state) => state.members);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<IMember>();
    useEffect(() => {
        if (!members.length) {
            dispatch(fetchMembers({ limit: 6, offset: 0 }));
        }
    }, []);

    const handleSelectMember = (value: IMember) => {
        setSelectedMember(value);
        setOpenEditModal(true);
    };

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

    const handleEditMemberFormSubmit = async (fromData: Omit<IFromState, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' | 'uid'>) => {
        try {
        } catch (error) {
            throw new Error('Invalid request');
        }
    };

    return (
        <div className='relative bg-cm-gray-200 pb-8 min-h-screen'>
            <ListBar />
            {loading ? (
                <Spinner className='mt-40' />
            ) : (
                <div className='max-w-6xl px-5 mx-auto relative'>
                    {members.map((member) => {
                        return <List onSelect={handleSelectMember} key={member.uid} member={member} />;
                    })}
                    {paginationLoading ? <Spinner className='mt-10' /> : null}
                </div>
            )}
            <AddAndEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSubmit={handleEditMemberFormSubmit}
                editMood={true}
                selectedValue={selectedMember}
            />
        </div>
    );
};

export default MemberLists;
