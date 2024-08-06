import { Category } from '@/entities/Category';
import { Income } from '@/entities/Income';

export interface IncomeListServerProps {
    list: Income[];
    searchable?: boolean;
    groupBy?: 'month' | 'category';
    maxItems?: number;
    categories?: Category[];
}

export interface IncomeListClientProps extends IncomeListServerProps {
    categories: Category[];
}
