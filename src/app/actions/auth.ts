
'use server';

import { signIn } from '@/auth';

export async function handleGoogleSignIn() {
    await signIn('google');
}

export async function handleCredentialsSignup(formData: any) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    try {
        const res = await fetch(`${apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if (!res.ok) {
            return { error: data.message || 'Signup failed' };
        }

        return { success: true, data };
    } catch (error: any) {
        return { error: error.message || 'Something went wrong' };
    }
}
