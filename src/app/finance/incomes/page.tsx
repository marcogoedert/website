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
    Panel,
    PanelContent,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';
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

    type Statistics = {
        title: string;
        value: number;
    };

    const statistics: Statistics[] = incomes.reduce(
        (acc, income) => {
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
            const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;

            const incomeDate = new Date(income.date);

            if (
                incomeDate.getMonth() === thisMonth &&
                incomeDate.getFullYear() === thisYear
            ) {
                // This Month
                const totalThisMonth = acc.find(
                    (stat) => stat.title === 'This Month'
                );
                if (totalThisMonth) {
                    totalThisMonth.value += income.amount;
                } else {
                    acc.push({ title: 'This Month', value: income.amount });
                }
            }

            if (
                incomeDate.getMonth() === lastMonth &&
                incomeDate.getFullYear() === lastYear
            ) {
                // Last Month
                const totalLastMonth = acc.find(
                    (stat) => stat.title === 'Last Month'
                );
                if (totalLastMonth) {
                    totalLastMonth.value += income.amount;
                } else {
                    acc.push({ title: 'Last Month', value: income.amount });
                }
            }

            if (incomeDate.getFullYear() === thisYear) {
                // This Year
                const totalThisYear = acc.find(
                    (stat) => stat.title === 'This Year'
                );
                if (totalThisYear) {
                    totalThisYear.value += income.amount;
                } else {
                    acc.push({ title: 'This Year', value: income.amount });
                }
            }

            return acc;
        },
        [{ title: 'This Month', value: 0 }] as Statistics[]
    );

    return (
        <div className='flex flex-col w-full'>
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
                    <div className='grid grid-cols-12 gap-2 w-full'>
                        {statistics.map(({ title, value }, index) => (
                            <div
                                key={index}
                                className='col-span-12 sm:col-span-4'
                            >
                                <Panel>
                                    <PanelHeader className='flex-row items-center justify-between'>
                                        <PanelTitle className='inline-'>
                                            {title}
                                        </PanelTitle>
                                        <Icon
                                            icon='DOLLAR_SIGN'
                                            iconSettings={{ size: 20 }}
                                        />
                                    </PanelHeader>
                                    <PanelContent>
                                        <p className='text-4xl font-bold'>
                                            {value < 0 && '-'}$
                                            {Math.abs(value).toFixed(2)}
                                        </p>
                                    </PanelContent>
                                </Panel>
                            </div>
                        ))}
                    </div>
                    <div className='w-full flex'>
                        <AddIncome categories={categories}>
                            <Button
                                className='ml-auto mt-4'
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
