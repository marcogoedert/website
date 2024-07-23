import { ExpenseService } from '@/service/finance/ExpenseService';

interface PathParams {
    params: {
        id: string;
    };
}

export async function GET(
    req: Request,
    { params }: PathParams
): Promise<Response> {
    const { id } = params;

    try {
        const expenseService = await ExpenseService.getInstance();
        const expense = await expenseService.getExpense(id);
        return Response.json(expense);
    } catch (error) {
        console.error('↘️🚨 ~ GET /api/expense ~ FAILED', error);
        return new Response(`Category ${id} not found`, { status: 404 });
    }
}

export async function DELETE(
    req: Request,
    { params }: PathParams
): Promise<Response> {
    const { id } = params;
    const expenseService = await ExpenseService.getInstance();
    const ok = await expenseService.deleteExpense(id);
    if (ok) {
        return new Response(undefined, { status: 204 });
    }

    return new Response('Category not found', { status: 404 });
}
