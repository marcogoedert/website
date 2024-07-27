'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const rootPath = '/finance/settings';

const linkClass =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';

const items = [
    { title: 'Bank Accounts', href: `${rootPath}` },
    { title: 'Categories', href: `${rootPath}/categories` }
];

interface SideNavigationSettingsProps {}

export function SideNavigationSettings({}: SideNavigationSettingsProps): JSX.Element {
    const pathname = usePathname();
    return (
        <>
            {items.map((item, index) => (
                <Link
                    key={item.title}
                    href={item.href}
                    className={
                        pathname === item.href
                            ? cn(linkClass, 'bg-muted hover:bg-muted')
                            : linkClass
                    }
                >
                    {item.title}
                </Link>
            ))}
        </>
    );
}
