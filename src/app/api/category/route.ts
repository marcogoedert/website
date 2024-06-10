import { CategoryService } from '@/service/finance/category-service';

const categoryService = CategoryService.getInstance();

export async function GET(req: Request): Promise<Response> {
    const categories = await categoryService.getCategories();
    console.log('↘️ ~ GET /api/category ~ categories', categories);
    return new Response(JSON.stringify(categories), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log('☕ ~ POST /api/category ~ body', body);
    const ok = await categoryService.addCategory(body);
    if (ok) {
        return new Response('OK', { status: 201 });
    }
    return new Response('Error', { status: 404 });
}

export async function PATCH(req: Request): Promise<Response> {
    console.log('↘️ ~ PATCH /api/category');
    const body = await req.json();
    console.log('↘️ ~ PATCH /api/category ~ body ~', body);
    const ok = await categoryService.updateCategory(body);
    if (ok) {
        console.log('↘️ ~ PATCH /api/category ~ SUCCESS');
        return new Response(undefined, { status: 204 });
    }
    console.log('↘️ ~ PATCH /api/category ~ FAILED');
    return new Response('Category not found', { status: 404 });
}
