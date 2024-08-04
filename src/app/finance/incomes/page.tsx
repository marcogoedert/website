import { Button } from '@/components/ui/button';
import { fetchCategories } from '@/controller/finance/category.controller';
import { fetchIncomes } from '@/controller/finance/incomes.controller';
import { IconKey } from '@/entities/Icon';
import { getIncomeSideNavItems, getIncomeStats } from '@/lib/finance/income';
import Icon from '@/ui/atoms/icons/Icon';
import SelectAccount from '@/ui/molecules/FinanceDashboard/Account/SelectAccount';
import HomeMenu from '@/ui/molecules/FinanceDashboard/ActionMenu/HomeMenu';
import { AddIncome } from '@/ui/molecules/FinanceDashboard/Income/AddIncome';
import IncomeList from '@/ui/molecules/FinanceDashboard/Income/IncomeList';
import {
    Panel,
    PanelContent,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';
import {
    PageDescription,
    PageHeader,
    PageHeaderSeparator,
    PageTitle
} from '@/ui/organisms/FinanceDashboard/PageHeader';
import {
    SideNavigation,
    SideNavigationItem,
    SideNavigationProps
} from '@/ui/organisms/FinanceDashboard/SideNavigation';
import {
    Statistics,
    StatsPanels
} from '@/ui/organisms/FinanceDashboard/Statistics/Statistics';
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
    const categories = await fetchCategories();
    const sideNavItems: SideNavigationItem[] = getIncomeSideNavItems(incomes);
    const statistics: Statistics[] = getIncomeStats(incomes);

    return (
        <div className='flex flex-col w-full'>
            <PageHeader>
                <PageTitle>Incomes</PageTitle>
                <PageDescription>
                    View and manage all your incomes here.
                </PageDescription>
                <div className='flex items-center justify-between mt-4'>
                    <SelectAccount />
                    <HomeMenu />
                </div>
                <PageHeaderSeparator className='my-4' />
            </PageHeader>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                {/* SIDE NAVIGATION */}
                <SideNavigation items={sideNavItems} />
                <div className='flex-1 lg:max-w-2xl'>
                    <StatsPanels stats={statistics} />
                    <div className='w-full flex'>
                        <AddIncome categories={categories}>
                            <Button
                                className='ml-auto mt-4'
                                variant='secondary'
                            >
                                <Icon
                                    icon='PLUS'
                                    className='mr-2'
                                />{' '}
                                Add new
                            </Button>
                        </AddIncome>
                    </div>
                    <IncomeList
                        list={incomes}
                        searchable
                        groupBy='month'
                    />
                </div>
            </div>
        </div>
    );
}
