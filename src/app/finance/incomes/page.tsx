import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import {
    PageDescription,
    PageHeader,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
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

    // Get months from incomes
    const months = Array.from(
        new Set(incomes.map((income) => format(income.date, 'MMMM yyyy')))
    );

    return (
        <>
            <div className='flex flex-col'>
                <PageHeader>
                    <PageTitle>Incomes</PageTitle>
                    <PageDescription>
                        View and manage all your incomes here.
                    </PageDescription>
                </PageHeader>
                <div className='flex items-center justify-between mb-6'>
                    <SelectAccount />
                    <HomeMenu />
                </div>
                <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <aside className='-mx-4 lg:w-1/5'>
                        <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
                            {months.map((month, key) => (
                                <a
                                    key={key}
                                    href='#'
                                    className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start'
                                >
                                    {month}
                                </a>
                            ))}
                        </nav>
                    </aside>
                    <div className='flex-1 lg:max-w-2xl'>
                        <Command>
                            <CommandInput placeholder='Search incomes...' />
                            <CommandEmpty>No incomes found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className='gap-1'>
                                    <IncomeList
                                        list={incomes}
                                        searchable
                                    />
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </div>
                </div>
            </div>
        </>
    );
}
