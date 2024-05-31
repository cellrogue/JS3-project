'use client';

import { auth } from '/firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function SignOutButton({ onSignOut }) {
    const router = useRouter();

    const handleSignOut = useCallback(async () => {
        try {
            await signOut(auth);
            if (onSignOut) {
                onSignOut();
            }
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }, [onSignOut, router]);

    return (
        <button
            onClick={handleSignOut}
            className="rounded p-5 text-sm font-bold m-5"
        >
            Sign Out
        </button>
    );
}

export default SignOutButton;

