'use client';

import { fetchCategories } from '@/controller/finance/category.controller';
import { Category } from '@/entities/Category';
import Icon from '@/ui/atoms/icons/Icon';
import { useCallback, useState } from 'react';
import CategoryDialog from '../Dialog/CategoryDialog';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { IconKey } from '@/entities/Icon';
import type { CategoryListClientProps } from './types';

export function CategoryListClient({
    list
}: CategoryListClientProps): JSX.Element {
    const [categories, setCategories] = useState<Category[]>(list);

    const callback = useCallback(async () => {
        const newCategories = await fetchCategories();
        setCategories(newCategories);
    }, [categories]);

    return (
        <>
            <div className='w-full flex'>
                <CategoryDialog callback={callback}>
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
                </CategoryDialog>
            </div>
            <Command>
                <CommandInput placeholder='Search categories...' />
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                    <CommandList className='gap-1'>
                        {categories
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={`${category.id} ${category.name}`}
                                    className='aria-selected:bg-primary-foreground'
                                >
                                    <CategoryDialog
                                        category={category}
                                        callback={callback}
                                    >
                                        <button className='w-full flex items-center p-1'>
                                            <Icon
                                                icon={category.icon as IconKey}
                                                iconSettings={{ size: 20 }}
                                                className='mr-2'
                                            />
                                            {category.name}
                                        </button>
                                    </CategoryDialog>
                                </CommandItem>
                            ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </>
    );
}
