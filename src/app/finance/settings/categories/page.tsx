import { Separator } from '@/components/ui/separator';
import { fetchCategories } from '@/controller/finance/category.controller';
import CategoryList from '@/ui/molecules/FinanceDashboard/Category/CategoryList';
import { PageDescription, PageSubtitle } from '@/ui/organisms/FinanceDashboard/PageHeader';

export default async function CategoriesPage(): Promise<JSX.Element> {
    const categories = await fetchCategories();
    return (
        <div>
            <PageSubtitle className='text-lg font-medium'>Categories</PageSubtitle>
            <PageDescription className='text-sm text-muted-foreground'>
                This is where you can manage your categories. Your categories
                are used to track your income and expenses.
            </PageDescription>
            <Separator className='my-6' />
            <CategoryList list={categories} />
        </div>
    );
}
