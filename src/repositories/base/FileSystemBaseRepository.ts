import * as fs from 'fs';

import { BaseRepository } from './BaseRepository';

export abstract class FileSystemBaseRepository<T> implements BaseRepository<T> {
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
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<T[]> {
        return Promise.resolve(this._collection);
    }
    findOne(id: string): Promise<T> {
        throw new Error('Method not implemented.');
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
                JSON.stringify(newCollection, null, 2)
            );
            result = true;
        } catch (error) {
            result = false;
        }

        return result;
    }
}
