'use client';

import { Category } from '@/entities/Category';
import IncomeDialog from './IncomeDialog';
import { useIncomes } from '@/hooks/finance/use-incomes';

interface AddIncomeProps {
    children: React.ReactNode;
    categories: Category[];
}

export function AddIncome({
    children,
    categories
}: AddIncomeProps): JSX.Element {
    const { callback } = useIncomes({ list: [] });
    return (
        <IncomeDialog
            categories={categories}
            callback={callback}
        >
            {children}
        </IncomeDialog>
    );
}
