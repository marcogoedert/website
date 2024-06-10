import { Category } from '../entities/Category';
import { FileSystemBaseRepository } from './base/FileSystemBaseRepository';

export class CategoryRepository extends FileSystemBaseRepository<Category> {
    constructor() {
        const categoryFilePath = 'src/data/Category.data.ts';
        super(categoryFilePath);
    }

    async update(id: string, item: Category): Promise<boolean> {
        const index = this._collection.findIndex((c) => c.id === id);
        if (index === -1) {
            return false;
        }
        const newCollection = [...this._collection];

        newCollection[index] = item;
        const ok = await this.saveCollection(newCollection);
        if (ok) {
            this._collection.splice(index, 1, item);
        }
        return ok;
    }

    async delete(id: string): Promise<boolean> {
        const index = this._collection.findIndex((c) => c.id === id);
        if (index === -1) {
            return false;
        }
        const newCollection = this._collection.filter((c) => c.id !== id);
        const ok = await this.saveCollection(newCollection);
        if (ok) {
            this._collection.splice(index, 1);
        }
        return ok;
    }

    async findOne(id: string): Promise<Category> {
        const category = this._collection.find((c) => c.id === id);
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
        return category;
    }
}
