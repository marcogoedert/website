import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import Icon from '@/ui/atoms/icons/Icon';
import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import { AddIncome } from '@/ui/molecules/FinanceDashboard/Income/AddIncome';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import {
    PageDescription,
    PageHeader,
    PageHeaderSeparator,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
import {
    SideNavigation,
    SideNavigationItem,
    SideNavigationProps
} from '@/ui/organisms/FinanceDashboard/SideNavigation';
import { format } from 'date-fns';

interface IncomesPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function IncomesPage({
    searchParams
}: IncomesPageProps): Promise<JSX.Element> {
    const bankAccountParam = searchParams['bankAccount'];
    const incomes = await fetchIncomes({
        bankAccount: bankAccountParam
    });
    const categories = await fetchCategories();

    const sideNavItems: SideNavigationItem[] = incomes.reduce((acc, income) => {
        const month = format(income.date, 'MMMM yyyy');
        if (!acc.find((item) => item.title === month)) {
            acc.push({
                title: month,
                href: `#${month}`
            });
        }
        return acc;
    }, [] as SideNavigationItem[]);

    return (
        <div className='flex flex-col'>
            <PageHeader>
                <PageTitle>Incomes</PageTitle>
                <PageDescription>
                    View and manage all your incomes here.
                </PageDescription>
                <div className='flex items-center justify-between mt-4'>
                    <SelectAccount />
                    <HomeMenu />
                </div>
                <PageHeaderSeparator className='my-4' />
            </PageHeader>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <SideNavigation items={sideNavItems} />
                <div className='flex-1 lg:max-w-2xl'>
                    <div className='w-full flex'>
                        <AddIncome
                            categories={categories}
                        >
                            <Button
                                className='ml-auto'
                                variant='secondary'
                            >
                                <Icon
                                    icon='PLUS'
                                    className='mr-2'
                                />{' '}
                                Add new
                            </Button>
                        </AddIncome>
                    </div>
                    <IncomeList
                        list={incomes}
                        searchable
                        groupBy='month'
                    />
                </div>
            </div>
        </div>
    );
}
