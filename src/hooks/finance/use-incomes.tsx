import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { Income } from '@/entities/Income';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface UseIncomesProps {
    list: Income[];
    maxItems?: number;
}

export function useIncomes({ list, maxItems }: UseIncomesProps) {
    const searchParams = useSearchParams();

    const [bankAccount, setBankAccount] = useState<string>(
        searchParams.get('bankAccount') || ''
    );

    const [incomes, setIncomes] = useState<Income[]>(
        list.map((income) => {
            return new Income(
                income.id,
                income.accountId,
                income.name,
                income.amount,
                new Date(income.date),
                income.categoryId
            );
        }) || []
    );

    const callback = useCallback(async () => {
        const newIncomes = await fetchIncomes({ bankAccount });
        setIncomes(
            newIncomes.map(
                (income) =>
                    new Income(
                        income.id,
                        income.accountId,
                        income.name,
                        income.amount,
                        new Date(income.date),
                        income.categoryId
                    )
            )
        );
    }, [bankAccount]);

    useEffect(() => {
        const newBankAccount = searchParams.get('bankAccount') || '';
        if (newBankAccount !== bankAccount) {
            setBankAccount(newBankAccount);
        }
    }, [searchParams]);

    useEffect(() => {
        callback();
    }, [bankAccount]);

    useEffect(() => {
        list.map((income) => {
            return new Income(
                income.id,
                income.accountId,
                income.name,
                income.amount,
                new Date(income.date),
                income.categoryId
            );
        }) || [];
    }, [list]);

    if (maxItems) {
        return {
            incomes: incomes.slice(0, maxItems),
            callback
        };
    }

    return {
        incomes,
        callback
    };
}
