'use server';

import { Suspense } from 'react';
import CategoryListClient from './CategoryListClient';
import { fetchCategories } from '@/controller/finance/category.controller';

export default async function CategoryListServer(): Promise<JSX.Element> {
    const categories = await fetchCategories();

    return (
        <div className='grid grid-cols-1 gap-4'>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryListClient initialValue={categories} />
            </Suspense>
        </div>
    );
}
