import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SideNavigationSettings } from '@/ui/molecules/FinanceDashboard/Settings/SideNavigationClient';
import {
    PageDescription,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
import Link from 'next/link';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const URL = '/finance/settings';

const items = [
    { title: 'Bank Accounts', href: `${URL}` },
    { title: 'Categories', href: `${URL}/categories` }
];

const linkClass =
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';

export default function SettingsLayout({
    children
}: SettingsLayoutProps): JSX.Element {
    return (
        <>
            <div className='flex flex-col'>
                <div className='space-y-0.5'>
                    <PageTitle>Settings</PageTitle>
                    <PageDescription className='text-muted-foreground'>
                        Manage your account settings.
                    </PageDescription>
                </div>
                <Separator className='my-6' />
                <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <aside className='-mx-4 lg:w-1/5'>
                        <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
                            <SideNavigationSettings />
                        </nav>
                    </aside>
                    <div className='flex-1 lg:max-w-2xl'>
                        <div className='space-y-6'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
