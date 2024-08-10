import { fetchAccounts } from '@/controller/finance/account.controller';
import { Suspense } from 'react';
import { AccountListClient } from './client';
import type { AccountListServerProps } from './types';

export async function AccountListServer({
    list,
    searchable = false
}: AccountListServerProps): Promise<JSX.Element> {
    const accounts = list || (await fetchAccounts());

    return (
        <Suspense fallback={<div>Loading bank account list...</div>}>
            <AccountListClient
                list={accounts}
                searchable={searchable}
            />
        </Suspense>
    );
}
