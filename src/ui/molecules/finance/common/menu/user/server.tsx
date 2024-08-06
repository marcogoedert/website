import { Suspense } from 'react';
import { MenuUserClient } from './client';

export function MenuUserServer(): JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MenuUserClient />
        </Suspense>
    );
}
