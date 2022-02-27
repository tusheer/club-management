import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';
import useForm, { validator } from '../../../../libs/useForm';

export interface IFormState {
    email: string;
    password: string;
}

const Form = () => {
    const { handleSubmit, errors, state, getInputProps } = useForm<IFormState>({
        formState: {
            email: '',
            password: '',
        },
        onSubmit: () => console.log(),
    });
    return (
        <form onSubmit={handleSubmit}>
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
            <Button className='mt-12'>Signin</Button>
        </form>
    );
};

export default Form;
