'use server';

import { Account } from '@/entities/Account';
import { get, patch, post, remove } from '@/lib/http';

const URL = 'http://localhost:3000/api/account';
const nextConfig = {
    tags: ['account']
};

export async function fetchAccounts(): Promise<Account[]> {
    return (await get<Account[]>(URL, nextConfig)) || [];
}

export async function fetchAccountById(id: string): Promise<Account | null> {
    return await get<Account>(`${URL}/${id}`, nextConfig);
}

export async function addAccount(account: string): Promise<boolean> {
    const json = JSON.parse(account) as Account;
    const body = new Account(
        json.id,
        json.name,
        json.icon,
        json.walletId,
        json.creditCardId
    );
    return await post<Account>(URL, body, nextConfig);
}

export async function deleteAccount(id: string): Promise<boolean> {
    return await remove(`${URL}/${id}`, nextConfig);
}

export async function updateAccount(account: string): Promise<boolean> {
    const json = JSON.parse(account) as Account;
    const body = new Account(
        json.id,
        json.name,
        json.icon,
        json.walletId,
        json.creditCardId
    );
    return await patch<Account>(URL, body, nextConfig);
}
