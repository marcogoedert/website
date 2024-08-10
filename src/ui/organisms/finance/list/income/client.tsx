'use client';

/**
 * - Hook to format data into a list-compatible format
 * - Pass the openDialog function as a callback to the ListItem component instead of wrapping it with the AccountDialog component
 * - Remove the AccountDialog component from the IncomeList component and use the openDialog function directly
 * - Create a generic component derived from the IncomeList component
 */

import React, { useCallback } from 'react';
import Icon from '@/ui/atoms/icons/Icon';
import { format } from 'date-fns';
import { Income } from '@/entities/Income';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';

import { formatDate } from '@/lib/format';
import { useIncomes } from '@/hooks/finance/use-incomes';
import { Badge } from '@/components/ui/badge';
import { IncomeListClientProps } from './types';

import { cn } from '@/lib/utils';
import {
    List,
    ListItem,
    ListItemAmount,
    ListItemContent,
    ListItemDescription,
    ListItemIcon,
    ListItemText,
    ListItemTitle
} from '@/ui/molecules/finance/common/list';
import IncomeDialog from '@/ui/molecules/finance/income/dialog';

type GroupedItems = { [key: string]: Income[] };

function groupItemsByMonth(items: Income[]): GroupedItems {
    const dict: GroupedItems = {};
    return items.reduce((acc, item) => {
        const key = format(item.date, 'MMMM yyyy');
        if (!dict[key]) {
            dict[key] = [];
        }
        dict[key].push(item);
        return dict;
    }, dict);
}

export function IncomeListClient({
    list,
    groupBy,
    searchable = false,
    maxItems,
    categories,
    className
}: IncomeListClientProps) {
    const { incomes, callback } = useIncomes({ list, maxItems });

    const getListItem = useCallback(
        (income: Income): JSX.Element => {
            return (
                <CommandItem
                    key={`cmd-item-${income.id}`}
                    value={`${income.id} ${income.name}`}
                    asChild
                >
                    <IncomeDialog
                        key={income.id}
                        income={income}
                        categories={categories}
                        callback={callback}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <Icon
                                    icon={
                                        categories.find(
                                            (category) =>
                                                category.id ===
                                                income.categoryId
                                        )?.icon || 'SHAPES'
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText>
                                <ListItemTitle>{income.name}</ListItemTitle>
                                <ListItemDescription>
                                    {formatDate(income.date)}
                                </ListItemDescription>
                            </ListItemText>
                            <ListItemContent>
                                {income.date > new Date() && (
                                    <Badge variant='default'>
                                        <Icon
                                            icon='HOURGLASS'
                                            className='mr-1'
                                            iconSettings={{ size: 18 }}
                                        />{' '}
                                        Pending
                                    </Badge>
                                )}
                                <ListItemAmount>
                                    ${income.amount.toFixed(2)}
                                </ListItemAmount>
                            </ListItemContent>
                        </ListItem>
                    </IncomeDialog>
                </CommandItem>
            );
        },
        [callback, categories]
    );

    const getList = useCallback(
        (key: string, values: Income[]): JSX.Element => {
            return (
                <CommandList
                    className='gap-1'
                    key={`list-${key}`}
                >
                    <List>{values.map((income) => getListItem(income))}</List>
                </CommandList>
            );
        },
        []
    );

    const getGroup = useCallback(
        (key: string, values: Income[]): JSX.Element => {
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
        <Command className={cn(className)}>
            {searchable && <CommandInput placeholder='Search incomes...' />}
            <CommandEmpty>No incomes found.</CommandEmpty>

            {groupBy
                ? Object.entries(groupItemsByMonth(incomes)).map(
                      ([key, values]) => getGroup(key, values)
                  )
                : getList('all', incomes)}
        </Command>
    );
}
