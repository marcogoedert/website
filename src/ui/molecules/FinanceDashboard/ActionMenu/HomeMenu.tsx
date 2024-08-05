'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { EllipsisVertical, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomeMenu(): JSX.Element {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();

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
                    className='h-10 w-10 hover:scale-105 transition-transform duration-300'
                    aria-expanded={open}
                    role='combobox'
                >
                    <AvatarImage
                        src='https://github.com/marcogoedert.png'
                        alt='Marco Goedert'
                    />
                    <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                {/* <Button
                    variant='secondary'
                    role='combobox'
                    aria-expanded={open}
                    className='h-10 w-10 inline-flex items-center justify-center rounded-full'
                >
                    MG
                </Button> */}
            </PopoverTrigger>
            <PopoverContent
                align='end'
                className='w-[200px] p-0'
            >
                <Link
                    href={
                        searchParams.size === 0
                            ? '/finance/settings'
                            : `/finance/settings?${new URLSearchParams(
                                  searchParams
                              )}`
                    }
                >
                    <Button
                        variant='outline'
                        onClick={close}
                        className='w-full text-left justify-start items-center rounded-none'
                    >
                        <Settings
                            strokeWidth={1}
                            size={22}
                            className='mr-2'
                        />
                        Settings
                    </Button>
                </Link>
            </PopoverContent>
        </Popover>
    );
}
