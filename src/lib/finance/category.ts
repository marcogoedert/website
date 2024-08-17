import { Category } from '@/entities/Category';
import { IconKey } from '@/entities/Icon';

export function findCategoryIcon(
    categories: Category[],
    categoryId?: string | null,
    defaultIcon: IconKey = 'SHAPES'
): IconKey {
    if (!categoryId) return defaultIcon;
    const category = categories.find((category) => category.id === categoryId);
    if (!category) return defaultIcon;
    return category.icon;
}
