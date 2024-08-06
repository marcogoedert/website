import { Category } from '@/entities/Category';

export interface IncomeAddServerProps {
    children: React.ReactNode;
}

export interface IncomeAddClientProps extends IncomeAddServerProps {
    categories: Category[];
}
