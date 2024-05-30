'use client';

import SignOutButton from '/app/(auth)/_components/sign-out-button';
import Image from 'next/image';
import { useAuth } from '../../(auth)/_components/auth-provider';
import Link from 'next/link';

const Navbar = () => {
    const { user } = useAuth();

    const initials = user?.displayName
        ?.split(' ')
        .map((name) => name[0])
        .join('');

    return (
        <div className='flex justify-between items-center w-full px-6 md:px-16 lg:px-36 py-4 bg-purple-300 border-b border-tertiary shadow'>
            <Link href='/'>
                <Image
                    src='/assets/logo.webp'
                    alt='logo'
                    width={150}
                    height={60}
                    className='rounded-full'
                />
            </Link>
            <div className='flex gap-2 justify-between items-center'>
                {user ? (
                    <SignOutButton />
                ) : (
                    <Link href='/sign-in'>
                        <button className='rounded p-5 text-sm font-bold m-5'>Sign in</button>
                    </Link>
                )}

                {!user && (
                    <Link href='/sign-up'>
                        <button className='rounded p-5 text-sm font-bold m-5'>Sign Up</button>
                    </Link>
                )}
                {user && (
                    <div className='inline-flex justify-center items-center bg-secondary size-12 mx-3 rounded-full shadow-sm outline outline-1 outline-slate-200/10'>
                        <span className='font-medium tracking-wide'>
                            {initials}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Navbar;
