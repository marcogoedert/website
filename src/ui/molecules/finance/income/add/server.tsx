'use server';

import { Suspense } from 'react';
import { IncomeAddServerProps } from './types';
import { IncomeAddClient } from './client';
import { fetchCategories } from '@/controller/finance/category.controller';

export async function IncomeAddServer({
    children,
    categories
}: IncomeAddServerProps): Promise<JSX.Element> {
    const categoriesList = categories || (await fetchCategories());

    return (
        <Suspense fallback={<div>Loading add income...</div>}>
            <IncomeAddClient categories={categoriesList}>
                {children}
            </IncomeAddClient>
        </Suspense>
    );
}
