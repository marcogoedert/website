import { Suspense } from 'react';
import CategoryListClient from './CategoryListClient';
import { fetchCategories } from '@/controller/finance/category.controller';
import { Category } from '@/entities/Category';

interface CategoryListServerProps {
    list?: Category[];
}

export default async function CategoryListServer({
    list
}: CategoryListServerProps): Promise<JSX.Element> {
    const categories = list || (await fetchCategories());

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryListClient list={categories} />
        </Suspense>
    );
}
