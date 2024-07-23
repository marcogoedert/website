'use server';

import { Income } from '@/entities/Income';
import { get, patch, post, remove } from '@/lib/http';

const URL = 'http://localhost:3000/api/income';
const nextConfig = {
    tags: ['income']
};

export async function fetchIncomes(): Promise<Income[]> {
    const incomes = await get<Income[]>(URL, nextConfig);
    if (!incomes) {
        return [];
    }
    return incomes.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function fetchIncomeById(id: string): Promise<Income | null> {
    return await get<Income>(`${URL}/${id}`, nextConfig);
}

export async function addIncome(income: string): Promise<boolean> {
    const json = JSON.parse(income) as Income;
    const body = new Income(
        json.id,
        json.accountId,
        json.name,
        json.amount,
        json.date,
        json.categoryId
    );
    return await post<Income>(URL, body, nextConfig);
}

export async function deleteIncome(id: string): Promise<boolean> {
    return await remove(`${URL}/${id}`, nextConfig);
}

export async function updateIncome(income: string): Promise<boolean> {
    const json = JSON.parse(income) as Income;
    const body = new Income(
        json.id,
        json.accountId,
        json.name,
        json.amount,
        json.date,
        json.categoryId
    );
    return await patch<Income>(URL, body, nextConfig);
}
