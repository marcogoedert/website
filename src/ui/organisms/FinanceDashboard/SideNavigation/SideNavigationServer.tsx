import { Suspense } from 'react';
import { SideNavigationClient } from './SideNavigationClient';

export interface SideNavigationItem {
    title: string;
    href: string;
}

export interface SideNavigationProps {
    items: SideNavigationItem[];
}

export function SideNavigationServer({
    items
}: SideNavigationProps): JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SideNavigationClient items={items} />
        </Suspense>
    );
}
