'use server';

import { Suspense } from 'react';
import IncomeListClient from './IncomeListClient';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { Income } from '@/entities/Income';

interface IncomeListServerProps {
    list?: Income[];
    searchable?: boolean;
}

export default async function IncomeListServer({
    list,
    searchable = false
}: IncomeListServerProps): Promise<JSX.Element> {
    const incomes = list || (await fetchIncomes());
    const categories = await fetchCategories();

    return (
        <Suspense fallback={<div>Loading incomes...</div>}>
            <IncomeListClient
                list={incomes}
                categories={categories}
                searchable={searchable}
            />
        </Suspense>
    );
}
