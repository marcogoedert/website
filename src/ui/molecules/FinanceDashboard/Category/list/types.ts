import { Category } from '@/entities/Category';

export interface CategoryListServerProps {
    list?: Category[];
}

export interface CategoryListClientProps extends CategoryListServerProps {
    list: Category[];
}
