import React from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'RecipeByIdLayout metadata'
    }
type Props = {children: React.ReactNode}
const RecipeByIdLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipeByIdLayout;