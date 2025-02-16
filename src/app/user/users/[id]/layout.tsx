import React from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'UserByIdLayout metadata'
    }
type Props = {children: React.ReactNode}
const UserByIdLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default UserByIdLayout;