import { Badge } from '@/components/ui/badge';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { fetchAccounts } from '@/controller/finance/account.controller';
import { Account } from '@/entities/Account';
import Icon from '@/ui/atoms/icons/Icon';
import { Suspense } from 'react';
import AccountDialog from '../AccountDialog';
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
