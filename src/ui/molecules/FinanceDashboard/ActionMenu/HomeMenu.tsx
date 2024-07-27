'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { EllipsisVertical } from 'lucide-react';
import Icon from '@/ui/atoms/icons/Icon';
import CategoriesDialog from '../Category/Dialog/CategoriesDialog';

export default function HomeMenu(): JSX.Element {
    const [open, setOpen] = useState(false);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='h-10 w-10'
                >
                    <EllipsisVertical className='h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align='end'
                className='w-[200px] p-0'
            >
                <CategoriesDialog>
                    <Button
                        variant='outline'
                        className='w-full text-left justify-start items-center rounded-none'
                    >
                        <Icon
                            icon='SHAPES'
                            className='mr-2'
                        />
                        Manage categories
                    </Button>
                </CategoriesDialog>
                <Button
                    variant='outline'
                    onClick={close}
                    className='w-full text-left justify-start items-center rounded-none'
                >
                    <Icon
                        icon='HOME'
                        className='mr-2'
                    />
                    Settings
                </Button>
            </PopoverContent>
        </Popover>
    );
}
