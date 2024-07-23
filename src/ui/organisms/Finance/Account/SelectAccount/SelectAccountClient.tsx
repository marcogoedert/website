'use client';

import { useState } from 'react';
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

interface SelectAccountClientProps {
    initialValue: Account[];
}

export default function SelectAccountClient({
    initialValue
}: SelectAccountClientProps): JSX.Element {
    const [accounts, setAccounts] = useState<Account[]>(initialValue);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

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
                            : 'Select bank account'}

                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                    <Command>
                        <CommandInput placeholder='Search bank account...' />
                        <CommandEmpty>No bank accounts found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {accounts.map((account, index) => (
                                    <CommandItem
                                        key={index}
                                        value={account.id}
                                        onSelect={(selectedValue) => {
                                            setValue(
                                                selectedValue === value
                                                    ? ''
                                                    : selectedValue
                                            );
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
