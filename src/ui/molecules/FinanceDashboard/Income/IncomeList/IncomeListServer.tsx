'use server';

import { Suspense } from 'react';
import IncomeListClient from './IncomeListClient';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';

export default async function IncomeListServer(): Promise<JSX.Element> {
    const incomes = await fetchIncomes();
    const categories = await fetchCategories();

    return (
        <div className='grid grid-cols-1 gap-4 h-full'>
            <Suspense fallback={<div>Loading incomes...</div>}>
                <IncomeListClient
                    initialValue={incomes}
                    categories={categories}
                />
            </Suspense>
        </div>
    );
}
