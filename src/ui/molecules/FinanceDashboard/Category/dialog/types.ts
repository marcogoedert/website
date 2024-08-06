import { Category } from '@/entities/Category';

export interface CategoryDialogServerProps {
    category?: Category;
    callback: () => Promise<void>;
    children: React.ReactNode;
}

export interface CategoryDialogClientProps {
    category?: Category;
    callback: () => Promise<void>;
    children: React.ReactNode;
}
