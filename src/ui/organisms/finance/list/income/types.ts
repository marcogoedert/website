import { Category } from '@/entities/Category';
import { Income } from '@/entities/Income';
import React from 'react';

export interface IncomeListServerProps {
    list?: Income[];
    searchable?: boolean;
    groupBy?: 'month' | 'category';
    maxItems?: number;
    categories?: Category[];
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export interface IncomeListClientProps extends IncomeListServerProps {
    list: Income[];
    categories: Category[];
}
