import React from 'react';
import Modal from '../../../common/components/Modal';
import TextInput from '../../../common/components/TextInput';
import SingleSelect from '../../../common/components/SingleSelect';
import Button from '../../../common/components/Button';

interface IEditAndAddModal {
    onClose: () => void;
    open: boolean;
}

const AddAndEditModal: React.FC<IEditAndAddModal> = ({ onClose, open }) => {
    return (
        <Modal onClose={onClose} open={open}>
            <div className='pt-10 pb-20'>
                <h2 className='mb-8 text-center'>Add new Member</h2>

                <div className=' max-w-3xl w-full mx-auto px-5'>
                    <div className='mb-10 flex gap-5'>
                        <TextInput className='w-6/12' label='State' />
                        <TextInput className='w-6/12' label='Zip code' />
                    </div>
                    <div className='mb-10 flex gap-5'>
                        <SingleSelect
                            className='w-6/12'
                            data={{ value: '', label: '' }}
                            items={[]}
                            label='Tusher'
                            onChange={() => console.log('Tusher')}
                        />
                        <TextInput className='w-6/12' label='City' />
                    </div>
                    <div className='mb-10 flex gap-5'>
                        <TextInput className='w-6/12' label='State' />
                        <TextInput className='w-6/12' label='Zip code' />
                    </div>
                    <div className='flex justify-end pb-20'>
                        <Button>Add Address</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddAndEditModal;
