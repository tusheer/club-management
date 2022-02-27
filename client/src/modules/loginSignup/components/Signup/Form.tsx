import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';

const Form = () => {
    return (
        <form autoComplete='off'>
            <TextInput className='mb-10' label='First Name' type='text' />
            <TextInput name='email' className='mb-10' label='Last Name' type='text' />
            <TextInput name='email' className='mb-10' label='Email' type='email' />
            <TextInput name='password'  className='mb-10' label='Password' type='password' />
            <TextInput name='password' label='Confirm Password' type='password' />
            <Button className='mt-12'>Signup</Button>
        </form>
    );
};

export default Form;
