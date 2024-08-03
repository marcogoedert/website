'use client';

import { useCallback, useEffect, useState } from 'react';
import Icon from '@/ui/atoms/icons/Icon';
import { Category } from '@/entities/Category';
import { format } from 'date-fns';
import { Income } from '@/entities/Income';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import IncomeDialog from '../IncomeDialog';
import { useSearchParams } from 'next/navigation';
import { CommandItem } from '@/components/ui/command';
import {
    List,
    ListRow,
    ListRowAmount,
    ListRowDescription,
    ListRowIcon,
    ListRowText,
    ListRowTitle
} from '../../List';

function formatDate(date: Date): string {
    if (date.toDateString() === new Date().toDateString()) {
        return 'Today';
    }

    if (
        date.toDateString() ===
        new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
    ) {
        return 'Yesterday';
    }

    return format(date, 'd LLL').toUpperCase();
}

interface IncomeListClientProps {
    list: Income[];
    categories: Category[];
    maxItems?: number;
    searchable?: boolean;
}

export default function IncomeListClient({
    list,
    categories,
    searchable = false
}: IncomeListClientProps): JSX.Element {
    const searchParams = useSearchParams();
    const [bankAccount, setBankAccount] = useState<string>(
        searchParams.get('bankAccount') || ''
    );

    const [incomes, setIncomes] = useState<Income[]>(
        list.map((income) => {
            return new Income(
                income.id,
                income.accountId,
                income.name,
                income.amount,
                new Date(income.date),
                income.categoryId
            );
        }) || []
    );

    const callback = useCallback(async () => {
        const newIncomes = await fetchIncomes({ bankAccount });
        setIncomes(
            newIncomes.map(
                (income) =>
                    new Income(
                        income.id,
                        income.accountId,
                        income.name,
                        income.amount,
                        new Date(income.date),
                        income.categoryId
                    )
            )
        );
    }, [bankAccount]);

    useEffect(() => {
        const newBankAccount = searchParams.get('bankAccount') || '';
        if (newBankAccount !== bankAccount) {
            setBankAccount(newBankAccount);
        }
    }, [searchParams]);

    useEffect(() => {
        callback();
    }, [bankAccount]);

    return (
        <div
            id='rows-container'
            className='py-6 px-4 pt-0'
        >
            <List>
                {incomes.map((income, index) => {
                    const row = (
                        <IncomeDialog
                            key={income.id}
                            income={income}
                            categories={categories}
                            callback={callback}
                        >
                            <ListRow className=''>
                                <ListRowIcon>
                                    <Icon
                                        icon={
                                            categories.find(
                                                (category) =>
                                                    category.id ===
                                                    income.categoryId
                                            )?.icon || 'SHOPPING_BASKET'
                                        }
                                    />
                                </ListRowIcon>
                                <ListRowText>
                                    <ListRowTitle>{income.name}</ListRowTitle>
                                    <ListRowDescription>
                                        {formatDate(income.date)}
                                    </ListRowDescription>
                                </ListRowText>
                                <ListRowAmount>
                                    +${income.amount.toFixed(2)}
                                </ListRowAmount>
                            </ListRow>
                        </IncomeDialog>
                    );
                    if (searchable) {
                        return (
                            <CommandItem
                                key={`cmd-item-${index}`}
                                value={`${income.id} ${income.name}`}
                                asChild
                            >
                                {row}
                            </CommandItem>
                        );
                    }
                    return row;
                })}
            </List>
        </div>
    );
}
