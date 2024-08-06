import { Suspense } from 'react';
import { CategoryListClient } from './client';
import { fetchCategories } from '@/controller/finance/category.controller';
import { CategoryListServerProps } from './types';

export async function CategoryListServer({
    list
}: CategoryListServerProps): Promise<JSX.Element> {
    const categories = list || (await fetchCategories());

    return (
        <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryListClient list={categories} />
        </Suspense>
    );
}
