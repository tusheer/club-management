import React from 'react';
import Button from '../../../common/components/Button';
import TextInput from '../../../common/components/TextInput';

const Form = () => {
    return (
        <form autoComplete='off'>
            <TextInput id='email' name='email' className='mb-10' label='Email' type='email' />
            <TextInput id='password' name='password' label='password' type='password' />
            <Button className='mt-12'>Signin</Button>
        </form>
    );
};

export default Form;
