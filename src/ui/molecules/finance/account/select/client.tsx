'use client';

import { useEffect, useState } from 'react';
import { Account } from '@/entities/Account';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AccountSelectClientProps } from './types';

export function AccountSelectClient({
    list
}: AccountSelectClientProps): JSX.Element {
    const [accounts, setAccounts] = useState<Account[]>(list);
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get('bankAccount'));
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const bankAccountParam = searchParams.get('bankAccount');
        if (bankAccountParam !== value) {
            setValue(bankAccountParam);
        }
    }, [searchParams]);

    return (
        <>
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='w-[200px] justify-between'
                    >
                        {value
                            ? accounts.find((account) => account.id === value)
                                  ?.name
                            : 'All bank accounts'}

                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                    <Command>
                        <CommandEmpty>No bank accounts found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {accounts.map((account, index) => (
                                    <CommandItem
                                        key={index}
                                        value={account.id}
                                        onSelect={(selectedValue) => {
                                            if (selectedValue === value) {
                                                setValue('');
                                                router.push(pathname);
                                            } else {
                                                setValue(selectedValue);
                                                router.push(
                                                    `${pathname}?bankAccount=${selectedValue}`
                                                );
                                            }
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === account.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {account.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
