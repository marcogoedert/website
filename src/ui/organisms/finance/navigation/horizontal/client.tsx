'use client';

import { NavigationProps } from '../types';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { useNavigationBar } from '@/hooks/use-navigation-bar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function NavigationHorizontalClient(
    props: NavigationProps
): JSX.Element {
    const { currentUrl, hrefs } = useNavigationBar(props);

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {hrefs.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link
                            href={item.href!}
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    item.href === currentUrl
                                        ? 'bg-accent/50 text-accent-foreground'
                                        : ''
                                )}
                            >
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
