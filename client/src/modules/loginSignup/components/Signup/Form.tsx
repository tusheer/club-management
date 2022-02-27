import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';
import useForm, { validator } from '../../../../libs/useForm';
import signupAction from '../../../../api/auth/signup';
export interface IFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Form = () => {
    const { handleSubmit, errors, state, getInputProps } = useForm<IFormState>({
        formState: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async () => {
            try {
                const response = await signupAction(state);
                if (response) {
                    console.log(response);
                }
            } catch (error) {}
        },
    });

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
        </form>
    );
};

export default Form;
