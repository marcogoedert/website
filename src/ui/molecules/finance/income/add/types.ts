import { Category } from '@/entities/Category';

export interface IncomeAddServerProps {
    children: React.ReactNode;
    categories?: Category[];
}

export interface IncomeAddClientProps extends IncomeAddServerProps {
    categories: Category[];
}
