import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { getIncomeSideNavItems, getIncomeStats } from '@/lib/finance/income';
import Icon from '@/ui/atoms/icons/Icon';
import { NavigationItem } from '@/ui/organisms/finance/navigation/types';
import { Stat } from '@/ui/molecules/finance/common/panel/stat/types';
import IncomeAdd from '@/ui/molecules/finance/income/add';
import { PageHeader, PageTitle } from '@/ui/organisms/finance/header';
import { Stats } from '@/ui/organisms/finance/stats';
import { Navigation } from '@/ui/organisms/finance/navigation';
import { ListPanel } from '@/ui/organisms/finance/list';
import { fetchCategories } from '@/controller/finance/category.controller';
import { formatDate } from '@/lib/format';
import { format } from 'date-fns';
import { Income } from '@/entities/Income';
import { IncomeList } from '@/ui/organisms/finance/list/income';
// import { IncomeList } from '@/ui/organisms/finance/list/income';

function groupByMonth(incomes: Income[]): Record<string, Income[]> {
    return incomes.reduce((acc, income) => {
        const key = format(income.date, 'MMMM yyyy');
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(income);
        return acc;
    }, {} as Record<string, Income[]>);
}

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
    const categories = await fetchCategories();

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
                        <Navigation.Vertical items={sideNavItems} />
                        <div className='flex-1 lg:max-w-2xl'>
                            <ListPanel
                                items={groupByMonth(incomes)}
                                searchable
                                transform={(income) => ({
                                    id: income.id,
                                    title: income.name,
                                    searchValue: `${income.id} ${income.name}`,
                                    description: formatDate(
                                        new Date(income.date)
                                    ),
                                    icon:
                                        categories.find(
                                            (category) =>
                                                category.id ===
                                                income.categoryId
                                        )?.icon || 'SHAPES',
                                    badges: 
                                    new Date(income.date) > new Date() ?
                                    [
                                        {
                                            variant: 'default',
                                            children: (
                                                <>
                                                    <Icon
                                                        icon='HOURGLASS'
                                                        className='mr-1'
                                                        iconSettings={{
                                                            size: 18
                                                        }}
                                                    />{' '}
                                                    Pending
                                                </>
                                            )
                                        }
                                    ]
                                    : undefined,
                                    text: `$${income.amount.toFixed(2)}`
                                })}
                            />
                            {/* <IncomeList
                                list={incomes}
                                searchable
                                groupBy='month'
                                className='border'
                            /> */}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
