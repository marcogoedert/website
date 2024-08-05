'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SideNavigationProps } from './SideNavigationServer';

const linkClass =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';

export function SideNavigationClient({
    items
}: SideNavigationProps): JSX.Element {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // const anchorClass = 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start'
    return (
        <aside className='-mx-4 lg:w-1/5'>
            <nav className='hidden space-x-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap'>
                {items.map((item, index) => {
                    const isHash = item.href.startsWith('#');
                    const searchParamsString =
                        searchParams.size > 0
                            ? `?${searchParams.toString()}`
                            : '';
                    let href = pathname;
                    href += isHash
                        ? `${searchParamsString}${item.href}`
                        : `${item.href}${searchParamsString}`;
                    return (
                        <Link
                            key={index}
                            href={href}
                            className={
                                pathname === item.href
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
