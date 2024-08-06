import { Suspense } from 'react';
import { BreadcrumbClient } from './client';

export function BreadcrumbServer() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BreadcrumbClient />
        </Suspense>
    );
}
