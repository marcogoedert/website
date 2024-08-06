import { Separator } from '@/components/ui/separator';
import { AccountSelect } from '@/ui/molecules/finance/account/select';
import { MenuUser } from '@/ui/molecules/finance/common/menu/user';
import { NavigationHorizontal } from '@/ui/molecules/finance/common/navigation/horizontal/server';
import { Metadata } from 'next';

const items = [
    {
        title: 'Overview',
        href: '/finance'
    },
    {
        title: 'Incomes',
        href: '/finance/incomes'
    },
    {
        title: 'Expenses',
        href: '/finance/expenses'
    }
];

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
                    <AccountSelect />
                    <NavigationHorizontal items={items} />
                </div>
                <MenuUser />
            </div>
            <Separator className='my-0' />
            <div className='container relative space-y-4'>{children}</div>
        </main>
    );
}
