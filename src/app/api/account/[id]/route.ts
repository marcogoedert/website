import { AccountService } from '@/service/finance/AccountService';

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
        const accountService = await AccountService.getInstance();
        const account = await accountService.getAccount(id);
        return Response.json(account);
    } catch (error) {
        console.error('↘️🚨 ~ GET /api/account ~ FAILED', error);
        return new Response(`Account ${id} not found`, { status: 404 });
    }
}

export async function DELETE(
    req: Request,
    { params }: PathParams
): Promise<Response> {
    const { id } = params;
    
    try {
        const accountService = await AccountService.getInstance();
        const ok = await accountService.deleteAccount(id);
        if (ok) {
            
            return new Response(undefined, { status: 204 });
        }
        
        return new Response('Account not found', { status: 404 });
    } catch (error) {
        console.error('↘️🚨 ~ DELETE /api/account ~ FAILED', error);
        return new Response('Error', { status: 500 });
    }
}
