import { revalidateTag } from 'next/cache';
import {} from 'next/server';

export async function get<T>(
    url: string,
    config: NextFetchRequestConfig = {
        tags: [],
        revalidate: 300
    }
): Promise<T | null> {
    try {
        const response = await fetch(url, {
            next: config
        });
        return (await response.json()) as T;
    } catch (error) {
        console.error(`Failed to GET ${url}:`, error);
        return null;
    }
}

export async function post<T>(
    url: string,
    body: T,
    config: NextFetchRequestConfig = {
        tags: []
    }
): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            next: config,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            return false;
        }
        if (Array.isArray(config.tags) && config.tags.length > 0) {
            config.tags.forEach((tag) => revalidateTag(tag));
        }
        return true;
    } catch (error) {
        console.error(`Failed to POST ${url}:`, error);
        return false;
    }
}

export async function patch<T>(
    url: string,
    body: T,
    config: NextFetchRequestConfig = {
        tags: []
    }
): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            next: config,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            return false;
        }
        if (Array.isArray(config.tags) && config.tags.length > 0) {
            config.tags.forEach((tag) => revalidateTag(tag));
        }
        return true;
    } catch (error) {
        console.error(`Failed to PATCH ${url}:`, error);
        return false;
    }
}

export async function remove(
    url: string,
    config: NextFetchRequestConfig = {
        tags: []
    }
): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            next: config
        });
        if (!response.ok) {
            return false;
        }
        if (Array.isArray(config.tags) && config.tags.length > 0) {
            config.tags.forEach((tag) => revalidateTag(tag));
        }
        return true;
    } catch (error) {
        console.error(`Failed to DELETE ${url}:`, error);
        return false;
    }
}
