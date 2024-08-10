import { Suspense } from 'react';
import { NavigationVerticalClient } from './client';
import type { NavigationProps } from '../types';

export function NavigationVerticalServer({ items }: NavigationProps): JSX.Element {
    return (
        <Suspense fallback={<div>Loading vertical navigation...</div>}>
            <NavigationVerticalClient items={items} />
        </Suspense>
    );
}
