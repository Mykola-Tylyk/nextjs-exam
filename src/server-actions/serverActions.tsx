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

