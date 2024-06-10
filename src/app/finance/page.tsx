import Grid from '@/ui/templates/Grid';
import CategoryList from '@/ui/organisms/Finance/Category/CategoryList';

export default async function FinancePage(): Promise<JSX.Element> {
    const gridContainerClass = 'col-span-12 md:col-span-6';
    return (
        <main className='pt-24 min-h-screen'>
            <Grid>
                <div className='col-start-2 w-full flex flex-col items-center justify-center'>
                    <h1>Finance Page</h1>
                    <div className='grid grid-cols-12 gap-2 w-full'>
                        <div className={gridContainerClass}>
                            <h2 className='pb-2 pt-4 font-semibold text-lg'>
                                Income
                            </h2>
                            
                        </div>
                        <div className={gridContainerClass}>
                            <h2 className='pb-2 pt-4 font-semibold text-lg'>
                                Expenses
                            </h2>
                            
                        </div>
                        <div className={gridContainerClass}>
                            <h2 className='pb-2 pt-4 font-semibold text-lg'>
                                Categories
                            </h2>
                            <CategoryList />
                        </div>
                    </div>
                </div>
            </Grid>
        </main>
    );
}
