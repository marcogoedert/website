import { format } from 'date-fns';

export function formatDate(date: Date, displayYear: boolean = false): string {
    if (date.toDateString() === new Date().toDateString()) {
        return 'Today';
    }

    if (
        date.toDateString() ===
        new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
    ) {
        return 'Yesterday';
    }

    if (displayYear) {
        return format(date, 'd LLL yyyy').toUpperCase();
    }

    return format(date, 'd LLL').toUpperCase();
}

export function formatSearchParams(searchParams: {
    [key: string]: string | string[] | undefined;
}): string {
    const str = Object.keys(searchParams)
        .map((key) => {
            const value = searchParams[key];
            if (!value) {
                return '';
            }
            if (Array.isArray(value)) {
                return value
                    .map((v) => `${key}=${encodeURIComponent(v)}`)
                    .join('&');
            }
            return `${key}=${encodeURIComponent(value)}`;
        })
        .filter((v) => v)
        .join('&');
    return str ? `?${str}` : '';
}
