'use client';

import { fetchAccounts } from '@/controller/finance/account.controller';
import { Account } from '@/entities/Account';
import { useCallback, useState } from 'react';
import AccountDialog from '../AccountDialog';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import Icon from '@/ui/atoms/icons/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AccountListClientProps {
    list?: Account[];
}

export function AccountListClient({
    list
}: AccountListClientProps): JSX.Element {
    const [accounts, setAccounts] = useState(list || []);

    const callback = useCallback(async () => {
        const newAccounts = await fetchAccounts();
        setAccounts(newAccounts);
    }, []);

    return (
        <>
            <div className='w-full flex'>
                <AccountDialog callback={callback}>
                    <Button
                        className='ml-auto'
                        variant='secondary'
                    >
                        <Icon
                            icon='PLUS'
                            className='mr-2'
                        />{' '}
                        Add new
                    </Button>
                </AccountDialog>
            </div>
            <Command>
                <CommandInput placeholder='Search bank accounts...' />
                <CommandEmpty>No bank accounts found.</CommandEmpty>
                <CommandGroup>
                    <CommandList className='gap-1'>
                        {accounts
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((account, index) => (
                                <CommandItem
                                    key={index}
                                    value={`${account.id} ${account.name}`}
                                    className='aria-selected:bg-primary-foreground'
                                >
                                    <AccountDialog
                                        account={account}
                                        callback={callback}
                                    >
                                        <button className='w-full flex items-center justify-between p-1'>
                                            <div className='flex items-center'>
                                                <span className='relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center space-y-0 border'>
                                                    <Icon icon={account.icon} />
                                                </span>
                                                <div className='ml-4 space-y-1 text-start'>
                                                    <p className='text-sm font-medium leading-none'>
                                                        {account.name}
                                                    </p>
                                                    <p className='text-sm text-muted-foreground'>
                                                        ID: {account.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='hidden sm:flex items-center justify-end gap-2 flex-wrap'>
                                                {account.walletId && (
                                                    <Badge variant='outline'>
                                                        <Icon
                                                            icon='WALLET'
                                                            iconSettings={{
                                                                size: 18
                                                            }}
                                                            className='mr-2'
                                                        />
                                                        Wallet
                                                    </Badge>
                                                )}
                                                {account.creditCardId && (
                                                    <Badge variant='outline'>
                                                        <Icon
                                                            icon='CREDIT_CARD'
                                                            iconSettings={{
                                                                size: 18
                                                            }}
                                                            className='mr-2'
                                                        />
                                                        Credit Card
                                                    </Badge>
                                                )}
                                            </div>
                                        </button>
                                    </AccountDialog>
                                </CommandItem>
                            ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </>
    );
}
