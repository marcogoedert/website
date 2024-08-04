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
                    <SideNavigation items={sideNavItems} />
                    <div className='flex-1 lg:max-w-2xl'>
                        <IncomeList
                            list={incomes}
                            searchable
                            groupBy='month'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
