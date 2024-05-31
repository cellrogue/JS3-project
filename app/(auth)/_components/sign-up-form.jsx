'use client';

import { useAuth } from '/app/(auth)/_components/auth-provider';
import { addNewUser } from '/app/lib/user.db';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    email: z.string().email({ message: "You need to enter a valid email" }),
    firstName: z.string().min(1, { message: 'You need to enter a first name' }),
    lastName: z.string().min(1, { message: 'You need to enter a last name' }),
    password: z.string().min(6, { message: 'The password must be at least 6 characters long' }),
    confirmPassword: z.string(),
}).refine(values => values.password === values.confirmPassword, {
    message: 'Passwords must match',
    path: ["confirmPassword"]
});

const SignUpForm = () => {
    const { register } = useAuth();
    const router = useRouter();

    const initialValues = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const uid = await register(values);
            await addNewUser({ 
                name: `${values.firstName} ${values.lastName}`, 
                email: values.email, 
                password: values.password },
                uid
            );
            router.push('/');
            console.log('User added successfully');
        } catch (error) {
            console.error('Failed to add user:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => {
                try {
                    formSchema.parse(values);
                    return {};
                } catch (error) {
                    return error.flatten().fieldErrors;
                }
            }}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className='text-secondary mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 justify-center'>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="firstName">
                            First Name
                        </label>
                        <Field type="text" id="firstName" name="firstName" className="mt-2" />
                        <ErrorMessage name="firstName" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                        <Field type="text" id="lastName" name="lastName" className="mt-2" />
                        <ErrorMessage name="lastName" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="email">
                            Email
                        </label>
                        <Field type="email" id="email" name="email" className="mt-2" />
                        <ErrorMessage name="email" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="password">
                            Password
                        </label>
                        <Field type="password" id="password" name="password" className="mt-2" />
                        <ErrorMessage name="password" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <div className='flex justify-center flex-col'>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" className="mt-2" />
                        <ErrorMessage name="confirmPassword" component="div" className='text-error text-sm mt-[2px] flex gap-1 items-center' />
                    </div>
                    <button type="submit" disabled={isSubmitting} className='flex w-1/2 justify-center items-center rounded-md bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-secondary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary'>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;