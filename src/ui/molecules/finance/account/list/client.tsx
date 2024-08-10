'use client';

import { fetchAccounts } from '@/controller/finance/account.controller';
import { useCallback, useEffect, useState } from 'react';
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
import { AccountDialog } from '../dialog';
import type { AccountListClientProps } from './types';
import {
    List,
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemIcon,
    ListItemText,
    ListItemTitle
} from '../../common/list';
import { Account } from '@/entities/Account';

export function AccountListClient({
    list,
    searchable
}: AccountListClientProps): JSX.Element {
    const [accounts, setAccounts] = useState(list || []);

    const callback = useCallback(async () => {
        const newAccounts = await fetchAccounts();
        setAccounts(newAccounts);
    }, []);

    useEffect(() => {
        if (list) {
            setAccounts(list);
        }
    }, [list]);

    const getListItem = useCallback(
        (account: Account): JSX.Element => {
            return (
                <CommandItem
                    key={`cmd-item-${account.id}`}
                    value={`${account.id} ${account.name}`}
                    asChild
                >
                    <AccountDialog
                        key={account.id}
                        account={account}
                        callback={callback}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <Icon icon={account.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                <ListItemTitle>{account.name}</ListItemTitle>
                                <ListItemDescription>
                                    {account.id}
                                </ListItemDescription>
                            </ListItemText>
                            <ListItemContent>
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
                            </ListItemContent>
                        </ListItem>
                    </AccountDialog>
                </CommandItem>
            );
        },
        [callback]
    );

    const getList = useCallback(
        (key: string, values: Account[]): JSX.Element => {
            return (
                <CommandList
                    className='gap-1'
                    key={`list-${key}`}
                >
                    <List>{values.map((account) => getListItem(account))}</List>
                </CommandList>
            );
        },
        []
    );

    const getGroup = useCallback(
        (key: string, values: Account[]): JSX.Element => {
            return (
                <CommandGroup
                    key={key}
                    heading={key}
                >
                    <div
                        id={key}
                        className='scroll-m-36'
                    />
                    {getList(key, values)}
                </CommandGroup>
            );
        },
        []
    );

    return (
        <Command>
            {searchable && (
                <CommandInput placeholder='Search bank accounts...' />
            )}
            <CommandEmpty>No bank accounts found.</CommandEmpty>
            {getGroup('Bank Accounts', accounts)}
        </Command>
    );
}
