import React, { useState } from 'react';
import Modal from '../../../common/components/Modal';
import TextInput from '../../../common/components/TextInput';
import SingleSelect from '../../../common/components/SingleSelect';
import Button from '../../../common/components/Button';
import useForm, { validator } from '../../../../libs/useForm';
import { MembershipType } from '../../../../types/Member';

interface IEditAndAddModal {
    onClose: () => void;
    open: boolean;
}

interface IMember {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    membershipType: {
        value: MembershipType | '';
        label: MembershipType | '';
    };
    occupation: string;
}

const membershiptypes = ['VIP', 'CHILDREN', 'WOMEN', 'PLAYER', 'FOREIGNER', 'NORMAL'];

const AddAndEditModal: React.FC<IEditAndAddModal> = ({ onClose, open }) => {
    //useForm is a reusable hooks that can easily form handle and error handle.
    //https://github.com/tusheer/useForm
    //I have a plan to publish  it as a package
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const { handleSubmit, errors, state, getInputProps } = useForm<IMember>({
        formState: {
            firstName: '',
            lastName: '',
            email: '',
            number: '',
            membershipType: {
                value: '',
                label: '',
            },
            occupation: '',
        },
        onSubmit: () => {},
    });

    const onFileInputChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
        if (input.files === null) return;
        setImage(input.files[0]);
        setImageUrl(URL.createObjectURL(input.files[0]));
    };

    const url = image ? imageUrl : imageUrl.length ? imageUrl : '/static/assets/images/dummy-profile-pic.png';

    return (
        <Modal onClose={onClose} open={open}>
            <div className='pt-10 pb-20'>
                <h2 className='mb-8 text-center'>Add new Member</h2>

                <div className=' max-w-3xl w-full mx-auto px-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-10 flex gap-5'>
                            <TextInput
                                className='w-6/12'
                                label='First Name'
                                error={errors.firstName?.error}
                                errorText={errors.firstName?.message[0]}
                                {...getInputProps({
                                    name: 'firstName',
                                    validate: validator.isRequire().withMessage('First name is required'),
                                })}
                            />
                            <TextInput
                                className='w-6/12'
                                label='Last Name'
                                error={errors.lastName?.error}
                                errorText={errors.lastName?.message[0]}
                                {...getInputProps({
                                    name: 'lastName',
                                    validate: validator.isRequire().withMessage('Last name is required'),
                                })}
                            />
                        </div>
                        <div className='mb-10 flex gap-5'>
                            <TextInput
                                className='w-6/12'
                                type='email'
                                label='Email'
                                error={errors.email?.error}
                                errorText={errors.email?.message[0]}
                                {...getInputProps({
                                    name: 'email',
                                    validate: validator
                                        .isRequire()
                                        .withMessage('Email is required')
                                        .isValidEmail()
                                        .withMessage('Email is not valid'),
                                })}
                            />
                            <TextInput
                                className='w-6/12'
                                type='number'
                                label='Phone'
                                error={errors.number?.error}
                                errorText={errors.number?.message[0]}
                                {...getInputProps({ name: 'number', validate: validator.isRequire().withMessage('Number is required') })}
                            />
                        </div>
                        <div className='mb-10 flex gap-5'>
                            <SingleSelect
                                className='w-6/12'
                                data={state.membershipType}
                                items={membershiptypes.map((type) => ({ value: type, label: type }))}
                                label='Membership type'
                                error={errors.membershipType?.error}
                                errorText={errors.membershipType?.message[0]}
                                {...getInputProps({
                                    name: 'membershipType',
                                    validate: validator.custom((type) => type.value !== '').withMessage('Membership type is required'),
                                    onChange: (value) => value,
                                })}
                            />
                            <TextInput
                                className='w-6/12'
                                label='Occupation '
                                error={errors.occupation?.error}
                                errorText={errors.occupation?.message[0]}
                                {...getInputProps({
                                    name: 'occupation',
                                    validate: validator.isRequire().withMessage('Occupation is required'),
                                })}
                            />
                        </div>
                        <div className='h-32 w-32 bg-cm-red-500 border overflow-hidden relative'>
                            <img className='object-cover absolute top-0 left-0 bottom-0 right-0 w-full h-full ' src={url} alt='user' />
                            <div className='absolute h-10 w-full bottom-0 bg-black bg-opacity-50 hover:bg-opacity-70 cursor-pointer'>
                                <div className=' h-10 w-full relative'>
                                    <p className='text-white text-center font-medium mt-3'>Select Image</p>
                                    <input
                                        onChange={onFileInputChange}
                                        className='absolute cursor-pointer top-0 opacity-0 bottom-0 left-0 right-0'
                                        type='file'
                                        accept='image/*'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end pb-10'>
                            <Button type='submit'>Add Member</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default AddAndEditModal;
