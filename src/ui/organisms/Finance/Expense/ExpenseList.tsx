'use server';

import { Expense } from '@/entities/Expense';
import { Suspense } from 'react';
import ExpenseListClient from './ExpenseListClient';
import { revalidateTag } from 'next/cache';

const URL = 'http://localhost:3000/api/expenses';

export async function fetchExpenses() {
    try {
        const response = await fetch(URL, {
            next: {
                tags: ['expenses'],
                revalidate: 300
            }
        });
        if (!response.ok) {
            console.log('!Ok - Failed to fetch expenses!!!');
            return [];
        }
        const data = await response.json();
        return data as Expense[];
    } catch (error) {
        console.error('Error - Failed to fetch expenses!!!', error);
        return [];
    }
}

export async function deleteExpense(id: string) {
    try {
        console.log('🚨 ~ deleteExpense ~ id', id);
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            next: {
                tags: ['category']
            }
        });
        if (!response.ok) {
            console.log('!Ok - Failed to delete category!!!');
        }
        revalidateTag('category');
    } catch (error) {
        console.error('Error - Failed to delete category!!!', error);
    }
}

export default async function ExpenseList(): Promise<JSX.Element> {
    const expenses = await fetchExpenses();

    return (
        <div className='grid grid-cols-1 gap-4'>
            <Suspense fallback={<div>Loading expenses...</div>}>
                <ExpenseListClient initialValue={expenses} />
            </Suspense>
        </div>
    );
}
