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
