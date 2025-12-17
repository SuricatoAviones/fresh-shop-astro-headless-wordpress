// Data Access Layer

import { userSchema } from "@/types/types.auth";

export const guestCredentials = {
    "username": import.meta.env.GUEST_USER,
    "password": import.meta.env.GUEST_PASSWORD
}

export const verifySession = async (token: string) => {
    if(!token) return {user:null};

    const res = await fetch(`${import.meta.env.API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const json = await res.json();
    const user = userSchema.safeParse(json);

    if(!user.success) return {user:null};

    return {
        user: user.data
    };


}