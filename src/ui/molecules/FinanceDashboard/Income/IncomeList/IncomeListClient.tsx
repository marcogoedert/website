'use client';

import { useState } from 'react';
import Icon from '@/ui/atoms/icons/Icon';
import { Button } from '@/components/ui/button';
import { Category } from '@/entities/Category';
import { format } from 'date-fns';
import { Income } from '@/entities/Income';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import IncomeDialog from '../IncomeDialog';

interface IncomeListClientProps {
    initialValue: Income[];
    categories: Category[];
    maxItems?: number;
}

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

export default function IncomeListClient({
    initialValue,
    categories,
    maxItems = 5
}: IncomeListClientProps): JSX.Element {
    const [incomes, setIncomes] = useState<Income[]>(
        initialValue?.map((income) => {
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
    const recentIncomes = incomes.slice(0, maxItems);

    async function callback() {
        const newIncomes = await fetchIncomes();
        setIncomes(newIncomes);
    }

    const rows =
        recentIncomes.length > 0 ? (
            recentIncomes.map((income) => (
                <IncomeDialog
                    key={income.id}
                    callback={callback}
                    categories={categories}
                    income={income}
                >
                    <div className='flex items-center p-2 rounded-md select-none cursor-pointer hover:bg-primary-foreground '>
                        <span className='relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center space-y-0 border'>
                            <Icon
                                icon={
                                    categories.find(
                                        (category) =>
                                            category.id === income.categoryId
                                    )?.icon || 'SHOPPING_BASKET'
                                }
                            />
                        </span>
                        <div className='ml-4 space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                {income.name}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                {formatDate(income.date)}
                            </p>
                        </div>
                        <div className='ml-auto font-medium'>
                            +${income.amount.toFixed(2)}
                        </div>
                    </div>
                </IncomeDialog>
            ))
        ) : (
            <div className='py-6 text-center text-sm'>No incomes found</div>
        );

    return (
        <>
            <div className='rounded-xl border bg-card text-card-foreground shadow col-span-3'>
                <div className='flex justify-between items-center p-6'>
                    <div className='flex flex-col space-y-1.5'>
                        <h3 className='font-semibold leading-none tracking-tight'>
                            Recent Incomes
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            You got {incomes.length} transactions this month.
                        </p>
                    </div>
                    <IncomeDialog
                        callback={callback}
                        categories={categories}
                    >
                        <Button variant='secondary'>Add new</Button>
                    </IncomeDialog>
                </div>
                <div
                    id='rows-container'
                    className='py-6 px-4 pt-0'
                >
                    <div className='space-y-4'>{rows}</div>
                </div>
            </div>
        </>
    );
}
