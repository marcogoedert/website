import { CategoryService } from '@/service/finance/category-service';

const categoryService = CategoryService.getInstance();

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    const { id } = params;
    console.log('↘️ ~ DELETE /api/category ~ id', id);
    const ok = await categoryService.deleteCategory(id);
    if (ok) {
        console.log('↘️❤️ ~ DELETE /api/category ~ SUCCESS');
        return new Response(undefined, { status: 204 });
    }
    console.log('↘️🚨 ~ DELETE /api/category ~ FAILED');
    return new Response('Category not found', { status: 404 });
}
