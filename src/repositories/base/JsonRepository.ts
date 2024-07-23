import * as fs from 'fs';

import { BaseRepository } from './BaseRepository';
import { Entity } from '@/entities/Entity';

export class JsonRepository<T extends Entity>
    implements BaseRepository<T>
{
    public readonly _collection: T[] = [];
    private filePath: string;

    public constructor(filePath: string) {
        this.filePath = filePath;
    }

    async create(item: T): Promise<boolean> {
        const newCollection = [...this._collection, item];
        const ok = await this.saveCollection(newCollection);
        if (ok) {
            this._collection.push(item);
        }
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
    async init(): Promise<boolean> {
        const data = fs.readFileSync(this.filePath, {
            encoding: 'utf8'
        });
        const collection = JSON.parse(data) as T[];
        if (collection) {
            this._collection.push(...collection);
            return true;
        }
        return false;
    }
    async saveCollection(newCollection: T[]): Promise<boolean> {
        let result = false;

        try {
            fs.writeFileSync(
                this.filePath,
                JSON.stringify(newCollection, null, 2),
            );
            result = true;
        } catch (error) {
            result = false;
        }

        return result;
    }
}
