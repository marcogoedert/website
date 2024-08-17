import { ButtonProps } from '@/components/ui/button';
import { Category } from '@/entities/Category';
import { Income } from '@/entities/Income';

export type LooseIncome = Omit<Income, 'id'> & { id?: string };

export interface IncomeFormServerProps extends ButtonProps {
    callback?: () => Promise<void>;
    income?: LooseIncome;
    categories?: Category[];
}

export interface IncomeFormClientProps extends IncomeFormServerProps {
    categories: Category[];
}
