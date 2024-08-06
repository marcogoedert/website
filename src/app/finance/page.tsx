import ExpenseList from '@/ui/molecules/FinanceDashboard/Expense/ExpenseList';
import IncomeList from '@/ui/molecules/FinanceDashboard/income/list';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import {
    Panel,
    PanelContent,
    PanelDescription,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';
import Icon from '@/ui/atoms/icons/Icon';
import { IconKey } from '@/entities/Icon';
import {
    PageHeader,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';

console.log('FINANCE_HOME_MAX_ITEMS', process.env.FINANCE_HOME_MAX_ITEMS);

const MAX_ITEMS = Number(process.env.FINANCE_HOME_MAX_ITEMS || 5);

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
                <PageTitle>Moneyyy B1tCh 🤑🫰</PageTitle>
            </PageHeader>
            <div className='grid grid-cols-12 gap-4 w-full'>
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
                        <PanelHeader>
                            <PanelTitle>Recent Incomes</PanelTitle>
                            <PanelDescription>
                                You got {incomesThisMonth.length} incomes this
                                month
                            </PanelDescription>
                        </PanelHeader>
                        {/* <div className='pb-6 px-4 border border-yellow-400'> */}
                        <IncomeList
                            list={recentIncomes}
                            maxItems={MAX_ITEMS}
                        />
                        {/* </div> */}
                    </Panel>
                </div>
                <div className={gridContainerClass}>
                    <ExpenseList list={recentExpenses} />
                </div>
            </div>
        </>
    );
}
