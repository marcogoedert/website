import { fetchIncomes } from '@/controller/finance/incomes.controller';
import PanelContainer from '../PanelContainer';

export async function TotalIncome(): Promise<JSX.Element> {
    const income = await fetchIncomes();
    const totalIncome = income.reduce((acc, i) => acc + i.amount, 0);

    return (
        <PanelContainer title='Total Income'>
            <p className='text-4xl font-bold'>${totalIncome}</p>
        </PanelContainer>
    );
}
