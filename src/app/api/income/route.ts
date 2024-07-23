import { IncomeService } from '@/service/finance/IncomeService';

// Get all incomes
export async function GET(req: Request): Promise<Response> {
    try {
        const incomeService = await IncomeService.getInstance();
        const incomes = await incomeService.getIncomes();
        return new Response(JSON.stringify(incomes), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('↘️ ~ GET /api/income ~ error', error);
        return new Response('Error', { status: 500 });
    }
}

// Add a new income
export async function POST(request: Request) {
    const body = await request.json();
    console.log('POST /api/income', body);
    const incomeService = await IncomeService.getInstance();
    const ok = await incomeService.addIncome(body);
    if (ok) {
        return new Response('OK', { status: 201 });
    }
    return new Response('Error', { status: 404 });
}

// Update a income
export async function PATCH(req: Request): Promise<Response> {
    const body = await req.json();

    const incomeService = await IncomeService.getInstance();
    const ok = await incomeService.updateIncome(body);
    if (ok) {
        return new Response(undefined, { status: 204 });
    }

    return new Response('Income not found', { status: 404 });
}
