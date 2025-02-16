import React from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'RecipesTagLayout metadata'
    }
type Props = {children: React.ReactNode}
const RecipesTagLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipesTagLayout;