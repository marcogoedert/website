import { Separator } from '@/components/ui/separator';
import { fetchAccounts } from '@/controller/finance/account.controller';
import { AccountList } from '@/ui/molecules/FinanceDashboard/Account/AccountList';
import { PageDescription, PageSubtitle } from '@/ui/organisms/FinanceDashboard/PageHeader';

export default async function SettingsPage(): Promise<JSX.Element> {
    const accounts = await fetchAccounts();

    return (
        <div>
            <PageSubtitle className='text-lg font-medium'>Bank Accounts</PageSubtitle>
            <PageDescription className='text-sm text-muted-foreground'>
                This is where you can manage your bank accounts. Your bank
                accounts are used to track your income and expenses.
            </PageDescription>
            <Separator className='my-6' />
            <AccountList list={accounts} />
        </div>
    );
}
