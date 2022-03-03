import React, { useEffect, useState } from 'react';
import Modal from '../../../common/components/Modal';
import TextInput from '../../../common/components/TextInput';
import SingleSelect from '../../../common/components/SingleSelect';
import Button from '../../../common/components/Button';
import useForm, { validator } from '../../../../libs/useForm';
import { MembershipType } from '../../../../types/Member';
import { IMember } from '../../../../types/Member';
import toast, { Toaster } from 'react-hot-toast';
interface IFromState extends IMember {
    file: File | null;
}

interface IEditAndAddModal {
    onClose: () => void;
    open: boolean;
    onSubmit: (body: Omit<IFromState, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' | 'uid' | '_id'>) => Promise<void>;
    editMood?: boolean;
    selectedValue?: IMember;
}

interface IMemberState {
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

const initialState: IMemberState = {
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    membershipType: {
        value: '',
        label: '',
    },
    occupation: '',
};

const AddAndEditModal: React.FC<IEditAndAddModal> = ({ onClose, open, onSubmit, editMood = false, selectedValue }) => {
    //useForm is a reusable hooks that can easily form handle and error handle.
    //https://github.com/tusheer/useForm
    //I have a plan to publish  it as a package
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageError, setImageError] = useState(false);
    const { handleSubmit, errors, state, getInputProps, setState } = useForm<IMemberState>({
        formState: initialState,
        onSubmit: async () => {
            try {
                if (imageUrl && state.membershipType.value) {
                    await toast.promise(
                        onSubmit({
                            firstName: state.firstName,
                            lastName: state.lastName,
                            email: state.email,
                            number: state.number,
                            file: image,
                            membershipType: state.membershipType.value,
                            occupation: state.occupation,
                        }),
                        {
                            loading: <b>Submitting...</b>,
                            success: <b>Successfully {editMood ? 'updated' : 'created'} </b>,
                            error: <b>Something is wrong, Try again.</b>,
                        }
                    );
                } else {
                    setImageError(true);
                }
            } catch (error) {
                toast.error('Something is wrong, Try again.');
            }
        },
    });

    useEffect(() => {
        if (selectedValue && editMood) {
            setState({
                firstName: selectedValue.firstName,
                lastName: selectedValue.lastName,
                occupation: selectedValue.occupation,
                email: selectedValue.email,
                membershipType: {
                    label: selectedValue.membershipType,
                    value: selectedValue.membershipType,
                },
                number: selectedValue.number,
            });

            setImageUrl(process.env.S3_URL + selectedValue.avatar.url);
        } else {
            setState(initialState);
        }
    }, [selectedValue]);

    const onFileInputChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
        if (input.files === null) return;
        setImage(input.files[0]);
        setImageUrl(URL.createObjectURL(input.files[0]));
        setImageError(false);
    };

    const url = image ? imageUrl : imageUrl.length ? imageUrl : '/static/assets/images/dummy-profile-pic.png';

    return (
        <Modal onClose={onClose} open={open}>
            <div className='pt-10 pb-20'>
                <h2 className='mb-8 text-center'> {editMood ? 'Edit' : 'Add new'} Member</h2>

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
                                error={errors.membershipType?.error && !state.membershipType.value}
                                errorText={errors.membershipType?.message[0]}
                                {...getInputProps({
                                    name: 'membershipType',
                                    validate: validator
                                        .isRequire()
                                        .withMessage('Membership type in required')
                                        .findKey((type) => type.value),
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
                        <div className={`h-32 w-32  border overflow-hidden relative ${imageError ? 'border-2 border-cm-red-500' : ''}`}>
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
                            <Button type='submit'> {editMood ? 'Update' : 'Add'} Member</Button>
                        </div>
                    </form>
                </div>
                <Toaster position='bottom-left' />
            </div>
        </Modal>
    );
};

export default AddAndEditModal;
