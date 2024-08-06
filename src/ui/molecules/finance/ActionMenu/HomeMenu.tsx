'use client';

import { useCallback, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Settings2, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from '@/components/ui/command';

export default function HomeMenu(): JSX.Element {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Avatar
                    className='h-10 w-10 cursor-pointer transition-transform duration-300'
                    aria-expanded={open}
                    role='combobox'
                >
                    <AvatarImage
                        src='https://github.com/marcogoedert.png'
                        alt='Marco Goedert'
                    />
                    <AvatarFallback>MG</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent
                align='end'
                className='w-[200px] p-0'
            >
                <Command>
                    <div className='block space-y-1 p-2 select-none'>
                        <p className='text-sm font-medium leading-none'>
                            Marco Goedert
                        </p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            hello@marcogoedert.com
                        </p>
                    </div>
                    <CommandSeparator />
                    <CommandList>
                        <CommandItem
                            className='p-0'
                            disabled
                        >
                            <Link
                                className='relative w-full h-max flex items-center gap-0.5 px-2 py-1.5'
                                href='/finance/profile'
                                passHref
                            >
                                <User
                                    className='h-4 w-4 mr-2'
                                    strokeWidth={2}
                                />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </Link>
                        </CommandItem>
                        <CommandItem
                            className='p-0'
                            disabled={pathname === '/finance/settings'}
                        >
                            <Link
                                className='relative w-full h-max flex items-center gap-0.5 px-2 py-1.5'
                                href={
                                    searchParams.size === 0
                                        ? '/finance/settings'
                                        : `/finance/settings?${new URLSearchParams(
                                              searchParams
                                          )}`
                                }
                                onClick={close}
                                passHref
                            >
                                <Settings2
                                    className='h-4 w-4 mr-2'
                                    strokeWidth={2}
                                />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </Link>
                        </CommandItem>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
