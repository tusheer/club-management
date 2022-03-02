import React, { useState } from 'react';
import createMemberAction from '../../../../api/members/createMember';
import { IMember } from '../../../../types/Member';
import Button from '../../../common/components/Button';
import useScrollPosition from '../../../common/hooks/useScrollPosition';
import EditAndAddModal from '../AddAndEditModal';
import { useAppDispatch } from '../../../common/hooks';
import { addNewMember } from '../../../../reducers/membersReducer';
import sleep from '../../../../utils/sleep';

interface IFromState extends IMember {
    file: File | null;
}

const ListBar = () => {
    const dispatch = useAppDispatch();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const { ref, position } = useScrollPosition();

    const handleCreateMemberFormSubmit = async (fromData: Omit<IFromState, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' | 'uid'>) => {
        try {
            //I know this is something weird, but since we have a local server we cannot experience the loading time and interaction. And I never doing that in real work.
            process.env.NODE_ENV !== 'production' && (await sleep(1000));
            const response = await createMemberAction(fromData);
            if (response.success) {
                dispatch(addNewMember(response.result));
                setAddModalOpen(false);
            }
        } catch (error) {
            throw new Error('Invalid request');
        }
    };

    return (
        <React.Fragment>
            <div
                className={`w-full transition-all duration-500  absolute -mt-2 ${
                    position.top !== undefined && position.top <= 96 ? 'bg-white h-24' : 'bg-cm-purple-700 h-28 '
                }`}
            ></div>
            <div
                ref={ref}
                className={`top-24 transition-all duration-300 py-3 sticky mt-0.5 ${
                    position.top !== undefined && position.top <= 96 ? 'bg-white z-50 shadow' : ''
                }`}
            >
                <div className='max-w-6xl mb-2 relative px-5 mx-auto flex justify-end'>
                    <Button
                        onClick={() => setAddModalOpen(true)}
                        className='transition'
                        color={position.top !== undefined && position.top <= 96 ? 'primary' : 'secondary'}
                    >
                        Add new
                    </Button>
                </div>
            </div>

            <EditAndAddModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleCreateMemberFormSubmit} />
        </React.Fragment>
    );
};

export default ListBar;
