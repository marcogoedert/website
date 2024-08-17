import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import {
    getIncomeSideNavItems,
    getIncomeStats,
    groupIncomeListPanelByMonth
} from '@/lib/finance/income';
import Icon from '@/ui/atoms/icons/Icon';
import { NavigationItem } from '@/ui/organisms/finance/navigation/types';
import { Stat } from '@/ui/molecules/finance/common/panel/stat/types';
import { PageHeader, PageTitle } from '@/ui/organisms/finance/header';
import { Stats } from '@/ui/organisms/finance/stats';
import { Navigation } from '@/ui/organisms/finance/navigation';
import { ListPanel } from '@/ui/organisms/finance/list';
import { fetchCategories } from '@/controller/finance/category.controller';
import { formatSearchParams } from '@/lib/format';
import { Category } from '@/entities/Category';
import Link from 'next/link';

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
    const sideNavItems: NavigationItem[] = getIncomeSideNavItems(incomes);
    const statistics: Stat[] = getIncomeStats(incomes);
    const categories: Category[] = await fetchCategories();
    const formattedSearchParams = formatSearchParams(searchParams);

    return (
        <>
            <PageHeader>
                <div className='w-full flex items-center justify-between'>
                    <PageTitle>Incomes</PageTitle>
                    <Link href={`/finance/incomes/new${formattedSearchParams}`}>
                        <Button variant='secondary'>
                            <Icon
                                icon='PLUS'
                                className='mr-2'
                            />
                            Add new
                        </Button>
                    </Link>
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
                        <Navigation.Vertical items={sideNavItems} />
                        <div className='flex-1 lg:max-w-2xl'>
                            <ListPanel
                                items={groupIncomeListPanelByMonth(
                                    incomes,
                                    categories
                                )}
                                searchable
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
