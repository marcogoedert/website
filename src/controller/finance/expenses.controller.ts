'use server';

import { Expense } from '@/entities/Expense';
import { get, patch, post, remove } from '@/lib/http';

const URL = 'http://localhost:3000/api/expense';
const nextConfig = {
    tags: ['expense']
};

export async function fetchExpenses(): Promise<Expense[]> {
    const expenses = await get<Expense[]>(URL, nextConfig);
    if (!expenses) {
        return [];
    }
    return expenses.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function fetchExpenseById(id: string): Promise<Expense | null> {
    return await get<Expense>(`${URL}/${id}`, nextConfig);
}

export async function addExpense(expense: string): Promise<boolean> {
    const json = JSON.parse(expense) as Expense;
    const body = new Expense(
        json.id,
        json.accountId,
        json.name,
        json.amount,
        json.date,
        json.categoryId
    );
    return await post<Expense>(URL, body, nextConfig);
}

export async function deleteExpense(id: string): Promise<boolean> {
    return await remove(`${URL}/${id}`, nextConfig);
}

export async function updateExpense(expense: string): Promise<boolean> {
    const json = JSON.parse(expense) as Expense;
    const body = new Expense(
        json.id,
        json.accountId,
        json.name,
        json.amount,
        json.date,
        json.categoryId
    );
    return await patch<Expense>(URL, body, nextConfig);
}
