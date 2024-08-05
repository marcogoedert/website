import { Income } from '@/entities/Income';
import { SideNavigationItem } from '@/ui/organisms/FinanceDashboard/SideNavigation';
import { Statistics } from '@/ui/organisms/FinanceDashboard/Statistics/Statistics';
import { formatDate } from 'date-fns';

export function getIncomeStats(incomes: Income[]): Statistics[] {
    const statistics: Statistics[] = incomes.reduce(
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
        ] as Statistics[]
    );
    return statistics;
}

export function getIncomeSideNavItems(incomes: Income[]): SideNavigationItem[] {
    const sideNavItems: SideNavigationItem[] = incomes.reduce((acc, income) => {
        const month = formatDate(income.date, 'MMMM yyyy');
        if (!acc.find((item) => item.title === month)) {
            acc.push({
                title: month,
                href: `#${encodeURIComponent(month)}`
            });
        }
        return acc;
    }, [] as SideNavigationItem[]);
    return sideNavItems;
}

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

export function formatAmount(value?: string | number): string {
    const [integer, decimal] = (
        typeof value === 'number' ? value : parseFormattedAmount(value)
    )
        .toFixed(2)
        .split('.');
    const integerWithDots = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$ ${integerWithDots},${decimal}`;
}
