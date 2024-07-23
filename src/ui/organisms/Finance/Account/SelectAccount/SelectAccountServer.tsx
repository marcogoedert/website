'use server';

import { Suspense } from 'react';

import { fetchAccounts } from '@/controller/finance/account.controller';
import SelectAccountClient from './SelectAccountClient';

const URL = 'http://localhost:3000/api/account';

export default async function SelectAccountServer(): Promise<JSX.Element> {
    const accounts = await fetchAccounts();

    return (
        <div className='flex gap-4'>
            <Suspense
                fallback={
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'> 
                        {/* {accountCards} */}
                        Loading...
                    </div>
                }
            >
                <SelectAccountClient initialValue={accounts} />
            </Suspense>
        </div>
    );
}
