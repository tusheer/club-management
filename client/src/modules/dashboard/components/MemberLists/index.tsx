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
import editMemberAction from '../../../../api/members/editMember';
import sleep from '../../../../utils/sleep';
import { editMember } from '../../../../reducers/membersReducer';

interface IFromState extends IMember {
    file: File | null;
}
const MemberLists = () => {
    const dispatch = useAppDispatch();
    const { loading, members, meta, paginationLoading } = useAppSelector((state) => state.members);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<IMember>();
    useEffect(() => {
        if (!members.length) {
            dispatch(fetchMembers({ limit: 6, offset: 0 }));
        }
    }, []);

    const handleSelectMember = (value: IMember) => {
        setSelectedMember(value);
        setEditModalOpen(true);
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

    const handleEditMemberFormSubmit = async (
        fromData: Omit<IFromState, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' | 'uid' | '_id'>
    ) => {
        try {
            //I know this is something weird, but since we have a local server we cannot experience the loading time and interaction. And I never doing that in real work.
            process.env.NODE_ENV !== 'production' && (await sleep(1000));
            if (selectedMember) {
                const response = await editMemberAction({
                    ...fromData,
                    uid: selectedMember.uid,
                    _id: selectedMember._id,
                });
                if (response.success) {
                    dispatch(editMember(response.result));
                    setEditModalOpen(false);
                }
            }
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
                    {members.map((member, index) => {
                        return <List onSelect={handleSelectMember} key={index} member={member} />;
                    })}
                    {paginationLoading ? <Spinner className='mt-10' /> : null}
                </div>
            )}
            <AddAndEditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditMemberFormSubmit}
                editMood={true}
                selectedValue={selectedMember}
            />
        </div>
    );
};

export default MemberLists;
