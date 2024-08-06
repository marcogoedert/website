'use client';

import { useIncomes } from '@/hooks/finance/use-incomes';

import { IncomeAddClientProps } from './types';
import IncomeDialog from '../dialog';

export function IncomeAddClient({
    children,
    categories
}: IncomeAddClientProps): JSX.Element {
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
