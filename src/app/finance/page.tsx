import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import ExpenseList from '@/ui/molecules/FinanceDashboard/Expense/ExpenseList';
import CategoryList from '@/ui/molecules/FinanceDashboard/Category/CategoryList';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import { fetchExpenses } from '@/controller/finance/expenses.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { NumericPanel } from '@/ui/molecules/FinanceDashboard/Panel/NumericPanel';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import { BreadcrumbServer } from '@/ui/molecules/FinanceDashboard/Breadcrumb';

export default async function FinancePage(): Promise<JSX.Element> {
    const incomes = await fetchIncomes();
    const expenses = await fetchExpenses();
    const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
    const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

    const gridContainerClass = 'col-span-12 md:col-span-6';
    return (
        <>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>
                Finance Dashboard 💸
            </h2>
            <div className='flex items-center justify-between'>
                <SelectAccount />
                <HomeMenu />
            </div>
            <div className='grid grid-cols-12 gap-2 w-full'>
                <div className='col-span-4'>
                    <NumericPanel
                        title='Total Income'
                        type='currency'
                        value={totalIncome}
                    />
                </div>
                <div className='col-span-4'>
                    <NumericPanel
                        title='Total Expenses'
                        type='currency'
                        value={-totalExpense}
                    />
                </div>
                <div className='col-span-4'>
                    <NumericPanel
                        title='Balance'
                        type='currency'
                        value={totalIncome - totalExpense}
                    />
                </div>
                <div className={gridContainerClass}>
                    <IncomeList />
                </div>
                <div className={gridContainerClass}>
                    <ExpenseList />
                </div>
                {/* <div className={gridContainerClass}>
                        <CategoryList />
                    </div> */}
            </div>
        </>
    );
}
