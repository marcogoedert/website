import {
    PageHeader,
    PageTitle
} from '@/ui/organisms/finance/PageHeader';
import {
    SideNavigation,
    SideNavigationItem
} from '@/ui/organisms/finance/SideNavigation';

const items: SideNavigationItem[] = [
    { title: 'Bank Accounts', href: `/finance/settings` },
    { title: 'Categories', href: `/finance/settings/categories` }
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({
    children
}: SettingsLayoutProps): JSX.Element {
    return (
        <>
            <div className='flex flex-col gap-4'>
                <PageHeader>
                    <PageTitle>Settings</PageTitle>
                </PageHeader>
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
