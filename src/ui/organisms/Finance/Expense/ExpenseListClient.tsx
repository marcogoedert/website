'use client';

import { Expense } from '@/entities/Expense';
import ExpenseDialog from '@/ui/molecules/finance/ExpenseDialog';
import { useState } from 'react';
import { fetchExpenses } from './ExpenseList';

interface ExpenseListClientProps {
    initialValue: Expense[];
}

export default function ExpenseListClient({
    initialValue
}: ExpenseListClientProps): JSX.Element {
    const [expenses, setExpenses] = useState<Expense[]>(initialValue);

    async function callback() {
        const newExpenses = await fetchExpenses();
        setExpenses(newExpenses);
    }

    return (
        <div className='grid grid-cols-1 gap-4'>
            <ExpenseDialog
                callback={callback}
                variant={'secondary'}
            />
            {expenses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((expense) => (
                    <ExpenseDialog
                        key={expense.id}
                        expense={expense}
                        callback={callback}
                    />
                ))}
        </div>
    );
}
