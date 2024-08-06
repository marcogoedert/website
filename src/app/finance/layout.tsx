import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: {
        default: 'Finance Dashboard',
        template: '%s | Finance Dashboard'
    },

    description: 'Finance Dashboard is a simple finance tracking app.'
};

export default function FinanceLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <main className='pt-16 min-h-screen'>
            <div className='container relative flex items-center justify-between flex-wrap sm:h-16'>
                <div className='-ml-4 flex items-center justify-start flex-wrap gap-4'>
                    <SelectAccount />
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href='/finance'
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Overview
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href='/finance/incomes'
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Incomes
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href='/finance/expenses'
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Expenses
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <HomeMenu />
            </div>
            <Separator className='my-0' />
            <div className='container relative space-y-4'>{children}</div>
        </main>
    );
}
