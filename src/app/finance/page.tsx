import SelectAccount from '@/ui/organisms/Finance/Account/SelectAccount';
import ExpenseList from '@/ui/organisms/Finance/Expense/ExpenseList';
import CategoryList from '@/ui/organisms/Finance/Category/CategoryList';

export default async function FinancePage(): Promise<JSX.Element> {
    const gridContainerClass = 'col-span-12 md:col-span-6';
    return (
        <main className='pt-24 min-h-screen'>
            <div className='container relative'>
                <h2 className='text-3xl font-bold tracking-tight mb-4'>
                    Finance Dashboard 💸
                </h2>
                <SelectAccount />
                <div className='grid grid-cols-12 gap-2 w-full'>
                    <div className={gridContainerClass}>
                        <h2 className='pb-2 pt-4 font-semibold text-lg'>
                            Income
                        </h2>
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
