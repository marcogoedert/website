import { PageHeader, PageTitle } from '@/ui/organisms/finance/header';
import { Navigation, NavigationItem } from '@/ui/organisms/finance/navigation';

const items: NavigationItem[] = [
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
            <PageHeader>
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <Navigation.Vertical items={items} />
                <div className='flex-1 lg:max-w-2xl'>{children}</div>
            </div>
        </>
    );
}
