import ExpenseList from '@/ui/molecules/finance/Expense/ExpenseList';
import IncomeList from '@/ui/molecules/finance/income/list';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import {
    Panel,
    PanelContent,
    PanelDescription,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/finance/common/panel';
import { PageHeader, PageTitle } from '@/ui/organisms/finance/header';
import { Stats } from '@/ui/organisms/finance/stats';
import { Grid } from '@/ui/templates/grid';
import { Stat } from '@/ui/molecules/finance/common/panel/stat/types';

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

    const stats: Stat[] = [
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
                <PageTitle>Overview</PageTitle>
            </PageHeader>
            <Stats stats={stats} />
            <Grid>
                <div className='col-span-12 md:col-span-6'>
                    <Panel>
                        <PanelHeader>
                            <PanelTitle>Recent Incomes</PanelTitle>
                            <PanelDescription>
                                You got {incomesThisMonth.length} incomes this
                                month
                            </PanelDescription>
                        </PanelHeader>
                        <PanelContent>
                            <IncomeList
                                list={recentIncomes}
                                maxItems={MAX_ITEMS}
                            />
                        </PanelContent>
                    </Panel>
                </div>
                <div className='col-span-12 md:col-span-6'>
                    <ExpenseList list={recentExpenses} />
                </div>
            </Grid>
        </>
    );
}
