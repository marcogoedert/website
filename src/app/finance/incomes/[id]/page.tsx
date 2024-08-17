import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomeById } from '@/controller/finance/incomes.controller';
import { findCategoryIcon } from '@/lib/finance/category';
import Icon from '@/ui/atoms/icons/Icon';
import { IncomeForm } from '@/ui/molecules/finance/income/form';
import {
    PageDescription,
    PageHeader,
    PageTitle
} from '@/ui/organisms/finance/header';

const MIN_DATE = new Date('1998-02-11');
const MAX_DATE = new Date('2038-02-11');

interface IncomeIdPageProps {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function IncomeIdPage({
    params,
    searchParams
}: IncomeIdPageProps): Promise<JSX.Element> {
    const income = await fetchIncomeById(params.id);
    const categories = await fetchCategories();
    const title = income?.name || 'New Income';

    return (
        <>
            <PageHeader>
                <PageTitle>{title}</PageTitle>
                <PageDescription>
                    Make changes to the income &quot;
                    {title}
                    &quot; here. Click save when you&apos;re done.
                </PageDescription>
            </PageHeader>

            <div className='max-w-2xl'>
                <IncomeForm
                    income={income || undefined}
                    categories={categories}
                />
            </div>
        </>
    );
}
