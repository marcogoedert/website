import { CategoryService } from '@/service/finance/CategoryService';

const categoryService = CategoryService.getInstance();

// Get all categories
export async function GET(req: Request): Promise<Response> {
    const categories = await categoryService.getCategories();
    
    return new Response(JSON.stringify(categories), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// Add a new category
export async function POST(request: Request) {
    const body = await request.json();
    
    const ok = await categoryService.addCategory(body);
    if (ok) {
        return new Response('OK', { status: 201 });
    }
    return new Response('Error', { status: 404 });
}

// Update a category
export async function PATCH(req: Request): Promise<Response> {
    
    const body = await req.json();
    
    const ok = await categoryService.updateCategory(body);
    if (ok) {
        
        return new Response(undefined, { status: 204 });
    }
    
    return new Response('Category not found', { status: 404 });
}
