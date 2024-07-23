'use client';

import { useState } from 'react';
import { Expense } from '@/entities/Expense';
import Icon from '@/ui/atoms/icons/Icon';
import { Button } from '@/components/ui/button';
import ExpenseDialog from '../ExpenseDialog';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { Category } from '@/entities/Category';
import { format } from 'date-fns';

interface ExpenseListClientProps {
    initialValue: Expense[];
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

export default function ExpenseListClient({
    initialValue,
    categories,
    maxItems = 5
}: ExpenseListClientProps): JSX.Element {
    const [expenses, setExpenses] = useState<Expense[]>(
        initialValue?.map((expense) => {
            return new Expense(
                expense.id,
                expense.accountId,
                expense.name,
                expense.amount,
                new Date(expense.date),
                expense.categoryId
            );
        }) || []
    );
    const recentExpenses = expenses.slice(0, maxItems);

    async function callback() {
        const newExpenses = await fetchExpenses();
        setExpenses(newExpenses);
    }

    const rows =
        recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
                <ExpenseDialog
                    key={expense.id}
                    callback={callback}
                    categories={categories}
                    expense={expense}
                >
                    <div className='flex items-center p-2 rounded-md select-none cursor-pointer hover:bg-primary-foreground '>
                        <span className='relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center space-y-0 border'>
                            <Icon
                                icon={
                                    categories.find(
                                        (category) =>
                                            category.id === expense.categoryId
                                    )?.icon || 'SHOPPING_BASKET'
                                }
                            />
                        </span>
                        <div className='ml-4 space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                {expense.name}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                {formatDate(expense.date)}
                            </p>
                        </div>
                        <div className='ml-auto font-medium'>
                            -${expense.amount.toFixed(2)}
                        </div>
                    </div>
                </ExpenseDialog>
            ))
        ) : (
            <div className='py-6 text-center text-sm'>No expenses found</div>
        );

    return (
        <>
            <div className='rounded-xl border bg-card text-card-foreground shadow col-span-3'>
                <div className='flex justify-between items-center p-6'>
                    <div className='flex flex-col space-y-1.5'>
                        <h3 className='font-semibold leading-none tracking-tight'>
                            Recent Expenses
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            You made {expenses.length} expenses this month.
                        </p>
                    </div>
                    <ExpenseDialog
                        callback={callback}
                        categories={categories}
                    >
                        <Button variant='secondary'>Add new</Button>
                    </ExpenseDialog>
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
