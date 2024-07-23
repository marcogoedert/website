import { fetchExpenses } from '@/controller/finance/expenses.controller';
import PanelContainer from '../PanelContainer';

export async function TotalExpenses(): Promise<JSX.Element> {
    const expenses = await fetchExpenses();
    const totalExpenses = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
    );

    return (
        <PanelContainer title='Total Expenses'>
            <p className='text-4xl font-bold'>${totalExpenses}</p>
        </PanelContainer>
    );
}
