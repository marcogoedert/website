import { Suspense } from 'react';
import { IncomeFormClient } from './client';
import { IncomeFormServerProps } from './types';
import { fetchCategories } from '@/controller/finance/category.controller';

export async function IncomeFormServer({
    categories,
    ...props
}: IncomeFormServerProps): Promise<JSX.Element> {
    if (!categories) {
        categories = await fetchCategories();
    }
    return (
        <Suspense fallback={<div>Loading Income form...</div>}>
            <IncomeFormClient
                categories={categories}
                {...props}
            ></IncomeFormClient>
        </Suspense>
    );
}
