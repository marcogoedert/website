'use server';

import { Suspense } from 'react';
import { fetchAccounts } from '@/controller/finance/account.controller';
import SelectAccountClient from './SelectAccountClient';
import { Account } from '@/entities/Account';

interface SelectAccountServerProps {
    list?: Account[];
}

export default async function SelectAccountServer({
    list
}: SelectAccountServerProps): Promise<JSX.Element> {
    const accounts = list || (await fetchAccounts());

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <SelectAccountClient list={accounts} />
        </Suspense>
    );
}
