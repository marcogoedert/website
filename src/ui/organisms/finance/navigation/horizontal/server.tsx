import { NavigationProps } from '../types';
import { Suspense } from 'react';
import { NavigationHorizontalClient } from './client';

export function NavigationHorizontalServer({
    items
}: NavigationProps): JSX.Element {
    return (
        <Suspense fallback={<div>Loading horizontal navigation...</div>}>
            <NavigationHorizontalClient items={items} />
        </Suspense>
    );
}
