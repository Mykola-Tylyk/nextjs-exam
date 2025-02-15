import React from 'react';
import {Metadata} from 'next';
import AuthUser from "@/components/auth/AuthUser";

export const metadata: Metadata = {
    title: 'UserLayout metadata'
    }
type Props = {children: React.ReactNode}
const UserLayout = ({children}: Props) => {
    return (
        <>
            <AuthUser/>
            {children}
        </>
    );
};

export default UserLayout;