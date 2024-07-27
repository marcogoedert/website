'use server';

import { Suspense } from 'react';
import IncomeListClient from './IncomeListClient';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { Income } from '@/entities/Income';

interface IncomeListServerProps {
    list?: Income[];
}

export default async function IncomeListServer({
    list
}: IncomeListServerProps): Promise<JSX.Element> {
    const incomes = list || (await fetchIncomes());
    const categories = await fetchCategories();

    return (
        <div className='grid grid-cols-1 gap-4 h-full'>
            <Suspense fallback={<div>Loading incomes...</div>}>
                <IncomeListClient
                    list={incomes}
                    categories={categories}
                />
            </Suspense>
        </div>
    );
}
