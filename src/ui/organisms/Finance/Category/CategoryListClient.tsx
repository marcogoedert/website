'use client';

import { Category } from '@/entities/Category';
import CategoryDialog from '@/ui/molecules/finance/CategoryDialog';
import { useState } from 'react';
import { fetchCategories } from './CategoryList';

interface CategoryListClientProps {
    initialValue: Category[];
}

export default function CategoryListClient({
    initialValue
}: CategoryListClientProps): JSX.Element {
    const [categories, setCategories] = useState<Category[]>(initialValue);

    async function callback() {
        const newCategories = await fetchCategories();
        setCategories(newCategories);
    }

    return (
        <div className='grid grid-cols-1 gap-4'>
            <CategoryDialog
                callback={callback}
                variant={'secondary'}
            />
            {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                    <CategoryDialog
                        key={category.id}
                        category={category}
                        callback={callback}
                    />
                ))}
        </div>
    );
}
