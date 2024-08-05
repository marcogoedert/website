import { BankAccountService } from '@/service/finance/bank-account-service';

// Get all accounts
export async function GET(req: Request): Promise<Response> {
    try {
        const accountService = await BankAccountService.getInstance();
        const accounts = await accountService.getAccounts();
        return new Response(JSON.stringify(accounts), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('↘️ ~ GET /api/account ~ error', error);
        return new Response('Error', { status: 500 });
    }
}

// Add a new account
export async function POST(request: Request) {
    const body = await request.json();

    const accountService = await BankAccountService.getInstance();
    const ok = await accountService.addAccount(body);
    if (ok) {
        return new Response('OK', { status: 201 });
    }
    return new Response('Error', { status: 404 });
}

// Update a account
export async function PATCH(req: Request): Promise<Response> {
    const body = await req.json();
    console.log('🚀 ~ file: route.ts ~ line 116 ~ PATCH ~ body', body);
    const accountService = await BankAccountService.getInstance();
    const ok = await accountService.updateAccount(body);
    if (ok) {
        return new Response(undefined, { status: 204 });
    }

    return new Response('Account not found', { status: 404 });
}
