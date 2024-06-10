'use server';

import { Category } from '@/entities/Category';
import { Suspense } from 'react';
import CategoryListClient from './CategoryListClient';
import { revalidateTag } from 'next/cache';

const URL = 'http://localhost:3000/api/category';

export async function fetchCategories() {
    try {
        const response = await fetch(URL, {
            next: {
                tags: ['category'],
                revalidate: 300
            }
        });
        if (!response.ok) {
            console.log('!Ok - Failed to fetch categories!!!');
            return [];
        }
        const data = await response.json();
        return data as Category[];
    } catch (error) {
        console.error('Error - Failed to fetch categories!!!', error);
        return [];
    }
}

export async function deleteCategory(id: string) {
    try {
        console.log('🚨 ~ deleteCategory ~ id', id);
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

export default async function CategoryList(): Promise<JSX.Element> {
    const categories = await fetchCategories();

    return (
        <div className='grid grid-cols-1 gap-4'>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryListClient initialValue={categories} />
            </Suspense>
        </div>
    );
}
