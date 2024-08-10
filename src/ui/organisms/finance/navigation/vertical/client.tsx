'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { NavigationProps } from '../types';
import { useNavigationBar } from '@/hooks/use-navigation-bar';

// const anchorClass = 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start'
const linkClass =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';

export function NavigationVerticalClient({
    items
}: NavigationProps): JSX.Element {
    const { currentUrl, hrefs } = useNavigationBar({ items });

    return (
        <aside className='-mx-4 lg:w-1/5'>
            <nav className='hidden space-x-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap'>
                {hrefs.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={item.href!}
                            className={
                                item.href === currentUrl
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
