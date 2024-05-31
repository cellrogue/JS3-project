'use client';

import { useAuth } from '/app/(auth)/_components/auth-provider';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    email: z.string().email({ message: "You need to enter a valid email" }),
    password: z.string().min(6, { message: 'You need to enter a valid password' }),
});

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else {
        try {
            formSchema.parse(values);
        } catch (error) {
            return error.flatten().fieldErrors;
        }
    }
    return errors;
};

const SignInForm = () => {
    const { login } = useAuth();
    const router = useRouter();

    const initialValues = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
            await login(values);
            router.push('/'); 
            console.log('User signed in successfully');
        } catch (error) {
            console.error('Failed to sign in:', error);
            setErrors({ submit: 'Invalid email or password. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form className='text-secondary mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 justify-center'>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    {errors.submit && <div>{errors.submit}</div>}
                    <button type="submit" disabled={isSubmitting} className='flex w-1/4 justify-center rounded-md bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-secondary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary'>
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;