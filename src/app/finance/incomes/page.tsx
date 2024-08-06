import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { getIncomeSideNavItems, getIncomeStats } from '@/lib/finance/income';
import Icon from '@/ui/atoms/icons/Icon';
import { NavigationItem } from '@/ui/molecules/finance/common/navigation/types';
import { NavigationVertical } from '@/ui/molecules/finance/common/navigation/vertical';
import { Stat } from '@/ui/molecules/finance/common/panel/stat/types';
import IncomeAdd from '@/ui/molecules/finance/income/add';
import IncomeList from '@/ui/molecules/finance/income/list';
import { PageHeader, PageTitle } from '@/ui/organisms/finance/header';
import { Stats } from '@/ui/organisms/finance/stats';

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
    const sideNavItems: NavigationItem[] = getIncomeSideNavItems(incomes);
    const statistics: Stat[] = getIncomeStats(incomes);

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
                className='w-full space-y-4'
            >
                <TabsList>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='history'>History</TabsTrigger>
                </TabsList>

                <TabsContent value='overview'>
                    <div className='flex-1'>
                        <Stats stats={statistics} />
                    </div>
                </TabsContent>
                <TabsContent value='history'>
                    <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                        {/* SIDE NAVIGATION */}
                        <NavigationVertical items={sideNavItems} />
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
