import { Suspense } from 'react';
import { BreadcrumbClient } from './BreadcrumbClient';

export function BreadcrumbServer() {
    return (
        <Suspense>
            <BreadcrumbClient />
        </Suspense>
    );
}
