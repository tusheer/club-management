import React, { useState } from 'react';
import Button from '../../../common/components/Button';
import useScrollPosition from '../../../common/hooks/useScrollPosition';
import EditAndAddModal from '../AddAndEditModal';

const ListBar = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const { ref, position } = useScrollPosition();
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
                    <Button onClick={()=> setAddModalOpen(true)} className='transition' color={position.top !== undefined && position.top <= 96 ? 'primary' : 'secondary'}>
                        Add new
                    </Button>
                </div>
            </div>
            <EditAndAddModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
        </React.Fragment>
    );
};

export default ListBar;
