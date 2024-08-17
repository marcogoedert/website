'use client';

import {
    ReadonlyURLSearchParams,
    usePathname,
    useSearchParams
} from 'next/navigation';
import { useHash } from './use-hash';
import { useMemo } from 'react';
import {
    NavigationItem,
    NavigationProps
} from '@/ui/organisms/finance/navigation';

function getSearchParamsString(searchParams: ReadonlyURLSearchParams): string {
    return searchParams.size > 0 ? `?${searchParams.toString()}` : '';
}

interface UseNavigationBarProps extends NavigationProps {
    keepPathname?: boolean;
}

export function useNavigationBar({
    items,
    keepPathname = false
}: UseNavigationBarProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hash = useHash();

    const currentUrl = useMemo(() => {
        return `${pathname}${getSearchParamsString(searchParams)}${hash}`;
    }, [pathname, searchParams, hash]);

    const hrefs: NavigationItem[] = useMemo(
        () =>
            items.map((item) => {
                const { href, hash } = item;
                const path = keepPathname
                    ? `${pathname}${href}`
                    : href || pathname;
                // const hrefString = `/${path}`;
                const searchParamsString =
                    searchParams.size > 0 ? `?${searchParams.toString()}` : '';
                const hashString = hash ? `#${hash}` : '';
                return {
                    ...item,
                    href: `${path}${searchParamsString}${hashString}`
                };
            }),
        [items, pathname, searchParams, keepPathname]
    );

    return { currentUrl, hrefs };
}
