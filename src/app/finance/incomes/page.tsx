import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { getIncomeSideNavItems, getIncomeStats } from '@/lib/finance/income';
import Icon from '@/ui/atoms/icons/Icon';
import IncomeAdd from '@/ui/molecules/FinanceDashboard/income/add';
import IncomeList from '@/ui/molecules/FinanceDashboard/income/list';
import {
    PageHeader,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
import {
    SideNavigation,
    SideNavigationItem
} from '@/ui/organisms/FinanceDashboard/SideNavigation';
import {
    Statistics,
    StatsPanels
} from '@/ui/organisms/FinanceDashboard/Statistics/Statistics';

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
    const categories = await fetchCategories();
    const sideNavItems: SideNavigationItem[] = getIncomeSideNavItems(incomes);
    const statistics: Statistics[] = getIncomeStats(incomes);

    return (
        <>
            <PageHeader>
                <div className='w-full flex items-center'>
                    <PageTitle>Incomes</PageTitle>
                    <IncomeAdd>
                        <Button
                            className='ml-auto'
                            variant='secondary'
                        >
                            <Icon
                                icon='PLUS'
                                className='mr-2'
                            />{' '}
                            Add new
                        </Button>
                    </IncomeAdd>
                </div>
            </PageHeader>
            <Tabs
                defaultValue='overview'
                className='grid grid-cols-12 w-full gap-y-4'
            >
                <TabsList className='col-span-2'>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='history'>History</TabsTrigger>
                </TabsList>
                <span className='col-span-10' />
                <TabsContent
                    value='overview'
                    className='col-span-12'
                >
                    <div className='flex-1'>
                        <StatsPanels stats={statistics} />
                    </div>
                </TabsContent>
                <TabsContent
                    value='history'
                    className='col-span-12'
                >
                    <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                        {/* SIDE NAVIGATION */}
                        <SideNavigation items={sideNavItems} />
                        <div className='flex-1 lg:max-w-2xl'>
                            <IncomeList
                                list={incomes}
                                searchable
                                groupBy='month'
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
