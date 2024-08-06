import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { NavigationProps } from '../types';

export function NavigationHorizontal({ items }: NavigationProps): JSX.Element {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link
                            href={item.href!}
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
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
