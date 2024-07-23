import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import ExpenseList from '@/ui/molecules/FinanceDashboard/Expense/ExpenseList';
import CategoryList from '@/ui/molecules/FinanceDashboard/Category/CategoryList';
import { TotalExpenses } from '@/ui/molecules/FinanceDashboard/Expense/TotalExpenses';
import { TotalIncome } from '@/ui/molecules/FinanceDashboard/Income/TotalIncome';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';

export default async function FinancePage(): Promise<JSX.Element> {
    const gridContainerClass = 'col-span-12 md:col-span-6';
    return (
        <main className='pt-24 min-h-screen'>
            <div className='container relative space-y-2'>
                <h2 className='text-3xl font-bold tracking-tight mb-4'>
                    Finance Dashboard 💸
                </h2>
                <SelectAccount />
                <div className='grid grid-cols-12 gap-2 w-full'>
                    <div className='col-span-3'>
                        <TotalIncome />
                    </div>
                    <div className='col-span-3'>
                        <TotalExpenses />
                    </div>
                    <div className='col-span-3'></div>
                    <div className='col-span-3'></div>
                    <div className={gridContainerClass}>
                        <IncomeList />
                    </div>
                    <div className={gridContainerClass}>
                        <ExpenseList />
                    </div>
                    <div className={gridContainerClass}>
                        <CategoryList />
                    </div>
                </div>
            </div>
        </main>
    );
}
