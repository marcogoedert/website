import { Suspense } from 'react';
import { CategoryDialogServerProps } from './types';
import { CategoryDialogClient } from './client';

export async function CategoryDialogServer({
    children,
    ...props
}: CategoryDialogServerProps): Promise<JSX.Element> {
    return (
        <Suspense fallback='Loading...'>
            <CategoryDialogClient {...props}>{children}</CategoryDialogClient>
        </Suspense>
    );
}
