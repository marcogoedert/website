import { BreadcrumbServer } from '@/ui/molecules/FinanceDashboard/Breadcrumb';
import { Metadata } from 'next';

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
        <main className='pt-24 min-h-screen'>
            <div className='container relative space-y-2'>
                <BreadcrumbServer />
                {children}
            </div>
        </main>
    );
}
