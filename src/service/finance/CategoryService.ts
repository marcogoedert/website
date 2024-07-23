import { Category } from '@/entities/Category';
import { BaseRepository } from '@/repositories/base/BaseRepository';
import { JsonRepository } from '@/repositories/base/JsonRepository';

const CATEGORY_DATA_FILE_PATH = 'src/data/Category.data.ts';
export class CategoryService {
    private static instance: CategoryService;
    private categoriesRepository: BaseRepository<Category>;

    private constructor(categoriesRepository: BaseRepository<Category>) {
        this.categoriesRepository = categoriesRepository;
    }

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            const categoriesRepository = new JsonRepository<Category>(
                CATEGORY_DATA_FILE_PATH
            );
            categoriesRepository.init();
            CategoryService.instance = new CategoryService(
                categoriesRepository
            );
        }

        return CategoryService.instance;
    }

    public async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.findAll();
    }

    public async getCategory(categoryId: string): Promise<Category> {
        return await this.categoriesRepository.findOne(categoryId);
    }

    public async addCategory(category: Category): Promise<boolean> {
        return await this.categoriesRepository.create(category);
    }

    public async updateCategory(category: Category): Promise<boolean> {
        return await this.categoriesRepository.update(category.id, category);
    }

    public async deleteCategory(categoryId: string): Promise<boolean> {
        return await this.categoriesRepository.delete(categoryId);
    }
}
