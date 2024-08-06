'use server';

import { Suspense } from 'react';
import { IncomeAddServerProps } from './types';
import { IncomeAddClient } from './client';
import { fetchCategories } from '@/controller/finance/category.controller';

export async function IncomeAddServer({
    children
}: IncomeAddServerProps): Promise<JSX.Element> {
    const categories = await fetchCategories();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IncomeAddClient categories={categories}>
                {children}
            </IncomeAddClient>
        </Suspense>
    );
}
