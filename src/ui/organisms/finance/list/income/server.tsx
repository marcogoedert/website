'use server';

import { Suspense } from 'react';
import { IncomeListClient } from './client';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import type { IncomeListServerProps } from './types';

export async function IncomeListServer({
    list,
    groupBy,
    searchable = false,
    maxItems,
    categories,
    ...props
}: IncomeListServerProps): Promise<JSX.Element> {
    const incomes = list || (await fetchIncomes());
    const categoriesList = categories || (await fetchCategories());

    return (
        <Suspense fallback={<div>Loading incomes list...</div>}>
            <IncomeListClient
                {...props}
                searchable={searchable}
                groupBy={groupBy}
                maxItems={maxItems}
                list={incomes}
                categories={categoriesList}
            />
        </Suspense>
    );
}
