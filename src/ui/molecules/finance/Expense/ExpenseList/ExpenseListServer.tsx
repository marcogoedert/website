'use server';

import { Suspense } from 'react';
import ExpenseListClient from './ExpenseListClient';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchCategories } from '@/controller/finance/category.controller';
import { Expense } from '@/entities/Expense';

interface ExpenseListServerProps {
    list?: Expense[];
}

export default async function ExpenseListServer({
    list
}: ExpenseListServerProps): Promise<JSX.Element> {
    const expenses = list || (await fetchExpenses());
    const categories = await fetchCategories();

    return (
        <div className='grid grid-cols-1 gap-4 h-full'>
            <Suspense fallback={<div>Loading expenses...</div>}>
                <ExpenseListClient
                    initialValue={expenses}
                    categories={categories}
                />
            </Suspense>
        </div>
    );
}
