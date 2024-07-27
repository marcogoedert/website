'use server';

import { Suspense } from 'react';
import { fetchAccounts } from '@/controller/finance/account.controller';
import SelectAccountClient from './SelectAccountClient';

export default async function SelectAccountServer(): Promise<JSX.Element> {
    const accounts = await fetchAccounts();

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <SelectAccountClient initialValue={accounts} />
        </Suspense>
    );
}
