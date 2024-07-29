import { fetchAccounts } from '@/controller/finance/account.controller';
import { Account } from '@/entities/Account';
import { Suspense } from 'react';
import { AccountListClient } from './AccountListClient';

interface AccountListServerProps {
    list?: Account[];
}

export async function AccountListServer({
    list
}: AccountListServerProps): Promise<JSX.Element> {
    const accounts = list || (await fetchAccounts());

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AccountListClient list={accounts} />
        </Suspense>
    );
}
