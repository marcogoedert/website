'use client';

import { Badge } from '@/components/ui/badge';
import { fetchCategories } from '@/controller/finance/category.controller';
import { Category } from '@/entities/Category';
import { IconKey } from '@/entities/Icon';
import Icon from '@/ui/atoms/icons/Icon';

import { useCallback, useState } from 'react';
import PanelContainer from '../../PanelContainer';
import CategoryDialog from '../CategoryDialog';

interface CategoryListClientProps {
    initialValue: Category[];
}

export default function CategoryListClient({
    initialValue
}: CategoryListClientProps): JSX.Element {
    const [categories, setCategories] = useState<Category[]>(initialValue);

    const callback = useCallback(async () => {
        const newCategories = await fetchCategories();
        setCategories(newCategories);
    }, [categories]);

    return (
        <PanelContainer title='Categories' subtitle={`You have ${categories.length} unique categories to label your incomes and expenses.`}>
            <div className='flex flex-wrap gap-2'>
                <CategoryDialog callback={callback}>
                    <Badge className='select-none cursor-pointer'>
                        <Icon
                            icon='PLUS'
                            iconSettings={{ size: 20 }}
                            className='mr-2'
                        />
                        Add Category
                    </Badge>
                </CategoryDialog>
                {categories
                    .map((category) => (
                        <CategoryDialog
                            key={category.id}
                            category={category}
                            callback={callback}
                        >
                            <Badge
                                variant='secondary'
                                className='select-none cursor-pointer'
                            >
                                <Icon
                                    icon={category.icon as IconKey}
                                    iconSettings={{ size: 20 }}
                                    className='mr-2'
                                />
                                {category.name}
                            </Badge>
                        </CategoryDialog>
                    ))}
            </div>
        </PanelContainer>
    );
}
