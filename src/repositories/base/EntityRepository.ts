import { BaseRepository } from './BaseRepository';
import { Entity } from '@/entities/Entity';

export abstract class EntityRepository<T extends Entity>
    implements BaseRepository<T>
{
    public readonly _collection: T[] = [];

    async init(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async saveCollection(newCollection: T[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async create(item: T): Promise<boolean> {
        const ok = await this.saveCollection([...this._collection, item]);
        if (ok) this._collection.push(item);
        return ok;
    }
    async update(id: string, item: T): Promise<boolean> {
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
    async findAll(): Promise<T[]> {
        return this._collection;
    }
    async findOne(id: string): Promise<T> {
        const item = this._collection.find((c) => c.id === id);
        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }
}
