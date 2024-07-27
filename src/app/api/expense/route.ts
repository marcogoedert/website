import { ExpenseService } from '@/service/finance/ExpenseService';

// Get all expenses
export async function GET(req: Request): Promise<Response> {
    try {
        const expenseService = await ExpenseService.getInstance();
        const expenses = await expenseService.getExpenses();

        const searchParams = new URL(req.url).searchParams;
        const bankAccount = searchParams.get('bankAccount');
        if (bankAccount) {
            const filteredExpenses = expenses.filter(
                (expense) => expense.accountId === bankAccount
            );
            return new Response(JSON.stringify(filteredExpenses), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify(expenses), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('↘️ ~ GET /api/expense ~ error', error);
        return new Response('Error', { status: 500 });
    }
}

// Add a new expense
export async function POST(request: Request) {
    const body = await request.json();
    console.log('POST /api/expense', body);
    const expenseService = await ExpenseService.getInstance();
    const ok = await expenseService.addExpense(body);
    if (ok) {
        return new Response('OK', { status: 201 });
    }
    return new Response('Error', { status: 404 });
}

// Update a expense
export async function PATCH(req: Request): Promise<Response> {
    const body = await req.json();

    const expenseService = await ExpenseService.getInstance();
    const ok = await expenseService.updateExpense(body);
    if (ok) {
        return new Response(undefined, { status: 204 });
    }

    return new Response('Expense not found', { status: 404 });
}
