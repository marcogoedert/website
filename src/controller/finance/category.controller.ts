'use server';

import { Category } from '@/entities/Category';
import { get, patch, post, remove } from '@/lib/http';

const URL = 'http://localhost:3000/api/category';
const nextConfig = {
    tags: ['category']
};

export async function fetchCategories(): Promise<Category[]> {
    const categories = await get<Category[]>(URL, nextConfig);
    if (!categories) {
        return [];
    }
    return categories.sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
    return await get<Category>(`${URL}/${id}`, nextConfig);
}

export async function addCategory(category: string): Promise<boolean> {
    const json = JSON.parse(category) as Category;
    const body = new Category(json.id, json.name, json.icon);
    return await post<Category>(URL, body, nextConfig);
}

export async function deleteCategory(id: string): Promise<boolean> {
    return await remove(`${URL}/${id}`, nextConfig);
}

export async function updateCategory(category: string): Promise<boolean> {
    const json = JSON.parse(category) as Category;
    const body = new Category(json.id, json.name, json.icon);
    return await patch<Category>(URL, body, nextConfig);
}
