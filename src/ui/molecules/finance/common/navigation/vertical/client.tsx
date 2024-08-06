'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    ReadonlyURLSearchParams,
    usePathname,
    useSearchParams
} from 'next/navigation';

import { useMemo } from 'react';
import { useHash } from '@/hooks/use-hash';
import { NavigationItem, NavigationProps } from '../types';

const linkClass =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';

function getSearchParamsString(searchParams: ReadonlyURLSearchParams): string {
    return searchParams.size > 0 ? `?${searchParams.toString()}` : '';
}

export function NavigationVerticalClient({
    items
}: NavigationProps): JSX.Element {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hash = useHash();

    const url = useMemo(() => {
        return `${pathname}${getSearchParamsString(searchParams)}${hash}`;
    }, [pathname, searchParams, hash]);

    const hrefs: NavigationItem[] = useMemo(
        () =>
            items.map((item) => {
                const { href, hash } = item;
                const hrefString = href || pathname;
                const searchParamsString =
                    searchParams.size > 0 ? `?${searchParams.toString()}` : '';
                const hashString = hash ? `#${hash}` : '';
                return {
                    ...item,
                    href: `${hrefString}${searchParamsString}${hashString}`
                };
            }),
        [items, pathname, searchParams]
    );

    // const anchorClass = 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start'
    return (
        <aside className='-mx-4 lg:w-1/5'>
            <nav className='hidden space-x-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap'>
                {hrefs.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={item.href!}
                            className={
                                item.href === url
                                    ? cn(linkClass, 'bg-muted hover:bg-muted')
                                    : linkClass
                            }
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
