'use server';

import {cookies} from 'next/headers'
import {ITokensWithUser} from "@/models/ITokensWithUser";
import {redirect} from "next/navigation";
import {ITokens} from "@/models/ITokens";

export const setCookies = async (tokenWithUser: ITokensWithUser | ITokens, shouldRedirect: boolean = true): Promise<void> => {
    const cookieStore = await cookies()
    cookieStore.set('accessToken', tokenWithUser.accessToken);
    cookieStore.set('refreshToken', tokenWithUser.refreshToken);
    if (shouldRedirect) {
        redirect('/user');
    }
}


export async function getCookiesAccessToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value;
    return token;
}


export async function getCookiesRefreshToken() {
    const cookieStore = await cookies()
    const tokenRef = cookieStore.get('refreshToken')?.value;
    return tokenRef;
}