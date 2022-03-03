import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';
import useForm, { validator } from '../../../../libs/useForm';
import signinAction from '../../../../api/auth/signin';
import toast, { Toaster } from 'react-hot-toast';
import sleep from '../../../../utils/sleep';
import { useRouter } from 'next/router';
import { setUser } from '../../../../reducers/userReducer';
import { useAppDispatch } from '../../../common/hooks';

export interface IFormState {
    email: string;
    password: string;
}

const Form = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    //useForm is a reusable hooks that can easily form handle and error handle.
    //https://github.com/tusheer/useForm
    //I have a plan to publish  it as a package

    const { handleSubmit, errors, state, getInputProps } = useForm<IFormState>({
        formState: {
            email: '',
            password: '',
        },
        onSubmit: () => {
            toast.promise(onSubmit(state), {
                loading: <b>Submitting...</b>,
                success: <b>Successfully login </b>,
                error: <b>Email or password invalid, Try again.</b>,
            });
        },
    });

    const onSubmit = async (state: IFormState) => {
        try {
            //I know this is something weird, but since we have a local server we cannot experience the loading time and interaction. And I never doing that in real work.
            process.env.NODE_ENV !== 'production' && (await sleep(1000));

            const response = await signinAction(state);
            if (response) {
                dispatch(
                    setUser({
                        user: response.result,
                        token: response.authToken,
                    })
                );
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
            <Toaster position='bottom-left' />
        </form>
    );
};

export default Form;
