import { Category } from '@/entities/Category';
import { Income } from '@/entities/Income';
import { Stat } from '@/ui/molecules/finance/common/panel/stat/types';
import { ListItemEntity } from '@/ui/organisms/finance/list/types';
import { NavigationItem } from '@/ui/organisms/finance/navigation';
import { findCategoryIcon } from './category';
import { format } from 'date-fns';
import { formatDate } from '../format';

export function getIncomeStats(incomes: Income[]): Stat[] {
    const statistics: Stat[] = incomes.reduce(
        (acc, income) => {
            const today = new Date();
            const thisMonth = today.getMonth();
            const thisYear = today.getFullYear();
            const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
            const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

            const incomeDate = new Date(income.date);

            if (incomeDate > today) {
                const totalPending = acc.find(
                    (stat) => stat.title === 'Pending'
                );
                if (totalPending) {
                    totalPending.value += income.amount;
                } else {
                    acc.push({
                        title: 'Pending',
                        value: income.amount,
                        icon: 'HOURGLASS'
                    });
                }
            }

            if (
                incomeDate <= today &&
                incomeDate.getMonth() === thisMonth &&
                incomeDate.getFullYear() === thisYear
            ) {
                // This Month
                const totalThisMonth = acc.find(
                    (stat) => stat.title === 'This Month'
                );
                if (totalThisMonth) {
                    totalThisMonth.value += income.amount;
                } else {
                    acc.push({
                        title: 'This Month',
                        value: income.amount,
                        icon: 'TRENDING_UP'
                    });
                }
            }

            if (
                incomeDate.getMonth() === lastMonth &&
                incomeDate.getFullYear() === lastMonthYear
            ) {
                // Last Month
                const totalLastMonth = acc.find(
                    (stat) => stat.title === 'Last Month'
                );
                if (totalLastMonth) {
                    totalLastMonth.value += income.amount;
                } else {
                    acc.push({
                        title: 'Last Month',
                        value: income.amount,
                        icon: 'DOLLAR_SIGN'
                    });
                }
            }

            if (incomeDate.getFullYear() === thisYear) {
                // This Year
                const totalThisYear = acc.find(
                    (stat) => stat.title === 'This Year'
                );
                if (totalThisYear) {
                    totalThisYear.value += income.amount;
                } else {
                    acc.push({
                        title: 'This Year',
                        value: income.amount,
                        icon: 'TRENDING_UP'
                    });
                }
            }

            if (incomeDate.getFullYear() !== thisYear) {
                // Past years
                const year = `Year ${incomeDate.getFullYear()}`;
                const pastYears = acc.find((stat) => stat.title === year);
                if (pastYears) {
                    pastYears.value += income.amount;
                } else {
                    acc.push({
                        title: year,
                        value: income.amount,
                        icon: 'DOLLAR_SIGN'
                    });
                }
            }

            return acc;
        },
        [
            { title: 'This Month', value: 0, icon: 'TRENDING_UP' },
            { title: 'Last Month', value: 0, icon: 'DOLLAR_SIGN' },
            { title: 'This Year', value: 0, icon: 'TRENDING_UP' }
        ] as Stat[]
    );
    return statistics;
}

export function getIncomeSideNavItems(incomes: Income[]): NavigationItem[] {
    const sideNavItems: NavigationItem[] = incomes.reduce((acc, income) => {
        const month = format(income.date, 'MMMM yyyy');
        if (!acc.find((item) => item.title === month)) {
            acc.push({
                title: month,
                hash: encodeURIComponent(month)
            });
        }
        return acc;
    }, [] as NavigationItem[]);
    return sideNavItems;
}

// const transform = ():  => ({
//     id: income.id,
//     title: income.name,
//     searchValue: `${income.id} ${income.name}`,
//     description: formatDate(new Date(income.date)),
//     icon: findCategoryIcon(categories, income.categoryId),
//     badges:
//         new Date(income.date) > new Date()
//             ? [
//                   {
//                       children: (
//                           <>
//                               <Icon
//                                   icon='HOURGLASS'
//                                   className='mr-1'
//                                   iconSettings={{
//                                       size: 18
//                                   }}
//                               />
//                               Pending
//                           </>
//                       )
//                   }
//               ]
//             : undefined,
//     text: `$${income.amount.toFixed(2)}`
// });

// const groupByMonth = (incomes: Income[]): Record<string, ListItemEntity[]> => {
//     return incomes.reduce((acc, income) => {
//         const key = format(income.date, 'MMMM yyyy');
//         if (!acc[key]) {
//             acc[key] = [];
//         }
//         acc[key].push(transform(income, categories));
//         return acc;
//     }, {} as Record<string, ListItemEntity[]>);
// };

export function getIncomeListPanelData(
    income: Income,
    categories: Category[]
): ListItemEntity {
    return {
        id: income.id,
        title: income.name,
        searchValue: `${new Date(income.date).valueOf()} ${income.name}`,
        icon: findCategoryIcon(categories, income.categoryId),
        description: formatDate(new Date(income.date)),
        text: `$${income.amount.toFixed(2)}`,
        link: { href: `/finance/incomes/${income.id}` },
        badges:
            new Date(income.date) > new Date()
                ? [
                      {
                          icon: 'HOURGLASS',
                          text: 'Pending'
                      }
                  ]
                : undefined
    };
}

export function groupIncomeListPanelByMonth(
    incomes: Income[],
    categories: Category[]
): Record<string, ListItemEntity[]> {
    return incomes.reduce((acc, income) => {
        const key = format(income.date, 'MMMM yyyy');
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(getIncomeListPanelData(income, categories));
        return acc;
    }, {} as Record<string, ListItemEntity[]>);
}

// ! TO-DO: Move this function to a shared module since it'll be used by Expenses as well
export function parseFormattedAmount(value?: string | number): number {
    if (!value) {
        return 0;
    }
    const cleanValue: string = String(value).replace(/\D/g, '');
    if (cleanValue.length === 0) {
        return 0;
    }
    return Number(cleanValue) / 100;
}

// ! TO-DO: Move this function to a shared module since it'll be used by Expenses as well
export function formatAmount(value?: string | number): string {
    const [integer, decimal] = (
        typeof value === 'number' ? value : parseFormattedAmount(value)
    )
        .toFixed(2)
        .split('.');
    const integerWithDots = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$ ${integerWithDots},${decimal}`;
}
