import { Suspense } from 'react';
import { AccountDialogClient } from './client';
import { AccountDialogServerProps } from './types';

export async function AccountDialogServer({
    children,
    ...props
}: AccountDialogServerProps): Promise<JSX.Element> {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AccountDialogClient {...props}>{children}</AccountDialogClient>
        </Suspense>
    );
}
