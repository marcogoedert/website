import { Separator } from '@/components/ui/separator';
import { fetchAccounts } from '@/controller/finance/account.controller';
import { AccountList } from '@/ui/molecules/FinanceDashboard/Account/AccountList';

export default async function SettingsPage(): Promise<JSX.Element> {
    const accounts = await fetchAccounts();

    return (
        <div>
            <h3 className='text-lg font-medium'>Bank Accounts</h3>
            <p className='text-sm text-muted-foreground'>
                This is where you can manage your bank accounts. Your bank
                accounts are used to track your income and expenses.
            </p>
            <Separator className='my-6' />
            <AccountList list={accounts} />
        </div>
    );
}
