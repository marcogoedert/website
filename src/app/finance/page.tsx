import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import ExpenseList from '@/ui/molecules/FinanceDashboard/Expense/ExpenseList';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import {
    Panel,
    PanelContent,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';
import Icon from '@/ui/atoms/icons/Icon';
import { IconKey } from '@/entities/Icon';

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

    return (
        <>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>
                Finance Dashboard 🪙
            </h2>
            <div className='flex items-center justify-between'>
                <SelectAccount />
                <HomeMenu />
            </div>
            <div className='grid grid-cols-12 gap-2 w-full'>
                {numericValues.map(({ title, value, icon }, index) => (
                    <div
                        key={index}
                        className='col-span-4'
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
                    <IncomeList list={incomes} />
                </div>
                <div className={gridContainerClass}>
                    <ExpenseList list={expenses} />
                </div>
            </div>
        </>
    );
}
