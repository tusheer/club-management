import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';
import useForm, { validator } from '../../../../libs/useForm';
import signupAction from '../../../../api/auth/signup';
import toast, { Toaster } from 'react-hot-toast';
import sleep from '../../../../utils/sleep';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export interface IFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Form = () => {
    const router = useRouter();
    //useForm is a reusable hooks that can easily form handle and error handle.
    //https://github.com/tusheer/useForm
    //I have a plan to publish  it as a package
    const { handleSubmit, errors, state, getInputProps } = useForm<IFormState>({
        formState: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: () => {
            toast.promise(onSubmit(state), {
                loading: <b>Submitting...</b>,
                success: <b>Successfully re </b>,
                error: <b>Invalid signup, Try again.</b>,
            });
        },
    });

    const onSubmit = async (state: IFormState) => {
        try {
            //I know this is something weird, but since we have a local server we cannot experience the loading time and interaction. And I never doing that in real work.
            process.env.NODE_ENV !== 'production' && (await sleep(1000));

            const response = await signupAction({
                firstName: state.firstName,
                lastName: state.firstName,
                email: state.email,
                password: state.password,
            });
            if (response) {
                Cookies.set('token', response.authToken);
                router.push('/dashboard');
            }
        } catch (error) {
            throw new Error('Invalid login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                className='mb-10'
                label='First Name'
                type='text '
                error={errors.firstName?.error}
                errorText={errors.firstName?.message[0]}
                {...getInputProps({ name: 'firstName', validate: validator.isRequire().withMessage('First name is required') })}
            />
            <TextInput
                className='mb-10'
                label='Last Name'
                type='text'
                error={errors.lastName?.error}
                errorText={errors.lastName?.message[0]}
                {...getInputProps({ name: 'lastName', validate: validator.isRequire().withMessage('Last name is required') })}
            />
            <TextInput
                className='mb-10'
                label='Email'
                type='email'
                error={errors.email?.error}
                errorText={errors.email?.message[0]}
                {...getInputProps({
                    name: 'email',
                    validate: validator.isRequire().withMessage('Email  is required').isValidEmail().withMessage('Email is not valid'),
                })}
            />
            <TextInput
                className='mb-10'
                label='Password'
                type='password'
                error={errors.password?.error}
                errorText={errors.password?.message[0]}
                {...getInputProps({
                    name: 'password',
                    validate: validator
                        .isRequire()
                        .withMessage('Password is required')
                        .isLength({ min: 6 })
                        .withMessage('Minimum password length is 6')
                        .isLength({ max: 16 })
                        .withMessage('Maximum password length is 16'),
                })}
            />
            <TextInput
                label='Confirm Password'
                type='password'
                error={errors.confirmPassword?.error}
                errorText={errors.confirmPassword?.message[0]}
                {...getInputProps({
                    name: 'confirmPassword',
                    validate: validator
                        .isRequire()
                        .custom((value) => value === state.password)
                        .withMessage('Password and confirm password does not match'),
                })}
            />
            <Button className='mt-12'>Signup</Button>
            <Toaster position='bottom-left' />
        </form>
    );
};

export default Form;
