import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import ExpenseList from '@/ui/molecules/FinanceDashboard/Expense/ExpenseList';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import {
    Panel,
    PanelContent,
    PanelDescription,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';
import Icon from '@/ui/atoms/icons/Icon';
import { IconKey } from '@/entities/Icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
    PageDescription,
    PageHeader,
    PageHeaderSeparator,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';

const MAX_ITEMS = 5;

interface FinancePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function FinancePage({
    searchParams
}: FinancePageProps): Promise<JSX.Element> {
    const bankAccountParam = searchParams['bankAccount'];

    const incomes = await fetchIncomes({
        bankAccount: bankAccountParam
    });
    const expenses = await fetchExpenses({
        bankAccount: bankAccountParam
    });

    const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
    const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

    const gridContainerClass = 'col-span-12 md:col-span-6';

    const numericValues: {
        title: string;
        value: number;
        icon: IconKey;
    }[] = [
        {
            title: 'Balance',
            value: totalIncome - totalExpense,
            icon: 'DOLLAR_SIGN'
        },
        { title: 'Total Income', value: totalIncome, icon: 'TRENDING_UP' },
        { title: 'Total Expenses', value: -totalExpense, icon: 'TRENDING_DOWN' }
    ];

    const incomesThisMonth = incomes.filter(
        (income) =>
            new Date(income.date).getMonth() === new Date().getMonth() &&
            new Date(income.date).getFullYear() === new Date().getFullYear()
    );

    const recentIncomes = incomes.slice(0, MAX_ITEMS);
    const recentExpenses = expenses.slice(0, MAX_ITEMS);

    return (
        <>
            <PageHeader>
                <PageTitle>Finance Dashboard 🪙</PageTitle>
                <PageDescription>
                    Keep track of your income and expenses. Visualize your
                    financial health. Plan your future.
                </PageDescription>
                <PageHeaderSeparator />
            </PageHeader>
            <div className='flex items-center justify-between'>
                <SelectAccount />
                <HomeMenu />
            </div>
            <div className='grid grid-cols-12 gap-2 w-full'>
                {numericValues.map(({ title, value, icon }, index) => (
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
                                    icon={icon}
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
                <div className={gridContainerClass}>
                    <Panel>
                        <div className='flex justify-between items-center'>
                            <PanelHeader>
                                <PanelTitle>Recent Incomes</PanelTitle>
                                <PanelDescription>
                                    You got {incomesThisMonth.length} incomes
                                    this month
                                </PanelDescription>
                            </PanelHeader>
                            <Link
                                href={
                                    bankAccountParam
                                        ? `/finance/incomes?bankAccount=${bankAccountParam}`
                                        : '/finance/incomes'
                                }
                            >
                                <Button
                                    variant='secondary'
                                    className='mx-6'
                                >
                                    <ArrowRight
                                        className='mr-1'
                                        strokeWidth={1.5}
                                        size={22}
                                    />
                                    View
                                </Button>
                            </Link>
                        </div>
                        <div className='grid grid-cols-1 gap-4 h-full pb-6 px-4'>
                            <IncomeList list={recentIncomes} maxItems={5}  />
                        </div>
                    </Panel>
                </div>
                <div className={gridContainerClass}>
                    <ExpenseList list={recentExpenses} />
                </div>
            </div>
        </>
    );
}
