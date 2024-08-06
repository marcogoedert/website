import { Suspense } from 'react';
import { IncomeDialogServerProps } from './types';
import { IncomeDialogClient } from './client';
import { fetchCategories } from '@/controller/finance/category.controller';

export async function IncomeDialogServer({
    categories,
    ...props
}: IncomeDialogServerProps): Promise<JSX.Element> {
    if (!categories) {
        categories = await fetchCategories();
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IncomeDialogClient
                categories={categories}
                {...props}
            ></IncomeDialogClient>
        </Suspense>
    );
}
