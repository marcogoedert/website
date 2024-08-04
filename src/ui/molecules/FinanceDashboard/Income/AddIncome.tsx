'use client';

import { Category } from '@/entities/Category';
import IncomeDialog from './IncomeDialog';
import { useIncomes } from '@/hooks/finance/use-incomes';

interface AddIncomeProps {
    children: React.ReactNode;
    categories: Category[];
    callback?: () => Promise<void>;
}

export function AddIncome({
    children,
    categories,
    callback
}: AddIncomeProps): JSX.Element {
    const { callback: incomeCallback } = useIncomes({ list: [] });
    return (
        <IncomeDialog
            categories={categories}
            callback={callback || incomeCallback}
        >
            {children}
        </IncomeDialog>
    );
}
