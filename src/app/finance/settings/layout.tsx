import { Separator } from '@/components/ui/separator';

import {
    PageDescription,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
import { SideNavigation } from '@/ui/organisms/FinanceDashboard/SideNavigation';

const URL = '/finance/settings';

const items = [
    { title: 'Bank Accounts', href: `${URL}` },
    { title: 'Categories', href: `${URL}/categories` }
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({
    children
}: SettingsLayoutProps): JSX.Element {
    console.log('[Layout] items:', items);
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
                    <SideNavigation items={items} />
                    <div className='flex-1 lg:max-w-2xl'>
                        <div className='space-y-6'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
