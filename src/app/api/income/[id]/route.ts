import { IncomeService } from '@/service/finance/IncomeService';

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
        const incomeService = await IncomeService.getInstance();
        const income = await incomeService.getIncome(id);
        return Response.json(income);
    } catch (error) {
        console.error('↘️🚨 ~ GET /api/income ~ FAILED', error);
        return new Response(`Category ${id} not found`, { status: 404 });
    }
}

export async function DELETE(
    req: Request,
    { params }: PathParams
): Promise<Response> {
    const { id } = params;
    const incomeService = await IncomeService.getInstance();
    const ok = await incomeService.deleteIncome(id);
    if (ok) {
        return new Response(undefined, { status: 204 });
    }

    return new Response('Category not found', { status: 404 });
}
