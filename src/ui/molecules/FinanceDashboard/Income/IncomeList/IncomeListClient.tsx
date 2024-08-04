'use client';

import { useCallback } from 'react';
import Icon from '@/ui/atoms/icons/Icon';
import { Category } from '@/entities/Category';
import { format } from 'date-fns';
import { Income } from '@/entities/Income';
import IncomeDialog from '../IncomeDialog';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    List,
    ListItem,
    ListItemAmount,
    ListItemDescription,
    ListItemIcon,
    ListItemText,
    ListItemTitle
} from '../../List';
import { formatDate } from '@/lib/format';
import { useIncomes } from '@/hooks/finance/use-incomes';

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

interface IncomeListClientProps {
    list: Income[];
    categories: Category[];
    searchable?: boolean;
    groupBy?: 'month' | 'category';
    maxItems?: number;
}

export default function IncomeListClient({
    list,
    categories,
    searchable = false,
    groupBy,
    maxItems
}: IncomeListClientProps): JSX.Element {
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
                                        )?.icon || 'SHOPPING_BASKET'
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText>
                                <ListItemTitle>{income.name}</ListItemTitle>
                                <ListItemDescription>
                                    {formatDate(income.date)}
                                </ListItemDescription>
                            </ListItemText>
                            <ListItemAmount>
                                +${income.amount.toFixed(2)}
                            </ListItemAmount>
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
        <>
            <Command>
                {searchable && <CommandInput placeholder='Search incomes...' />}
                <CommandEmpty>No incomes found.</CommandEmpty>
                {groupBy
                    ? Object.entries(groupItemsByMonth(incomes)).map(
                          ([key, values]) => getGroup(key, values)
                      )
                    : getList('all', incomes)}
            </Command>
        </>
    );
}
