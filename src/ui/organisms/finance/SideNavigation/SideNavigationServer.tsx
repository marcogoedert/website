import { Suspense } from 'react';
import { SideNavigationClient } from './SideNavigationClient';
import type { SideNavigationProps } from './SideNavigation.type';

export function SideNavigationServer({
    items
}: SideNavigationProps): JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SideNavigationClient items={items} />
        </Suspense>
    );
}
