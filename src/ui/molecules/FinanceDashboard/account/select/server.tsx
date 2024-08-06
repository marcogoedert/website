'use server';

import { Suspense } from 'react';
import { fetchAccounts } from '@/controller/finance/account.controller';

import { AccountSelectServerProps } from './types';
import { AccountSelectClient } from './client';

export async function AccountSelectServer({
    list
}: AccountSelectServerProps): Promise<JSX.Element> {
    const accounts = list || (await fetchAccounts());

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <AccountSelectClient list={accounts} />
        </Suspense>
    );
}
