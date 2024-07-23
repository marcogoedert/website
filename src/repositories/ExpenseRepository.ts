import fs from 'fs/promises';
import { parse } from 'csv-parse';

import { EntityRepository } from './base/EntityRepository';
import { Expense } from '@/entities/Expense';

export class ExpenseRepository extends EntityRepository<Expense> {
    private _filePath: string;

    public constructor(filePath: string) {
        super();
        this._filePath = filePath;
    }

    async init(): Promise<boolean> {
        let ok = true;
        const collection: Expense[] = [];

        const content = await fs.readFile(this._filePath, 'utf8');
        const records = parse(content, { delimiter: ',', from_line: 2 });

        await records.forEach((row: string[]) => {
            try {
                const id = row[0];
                const accountId = row[1];
                const name = row[2];
                const amount = parseFloat(row[3]);
                const date = new Date(row[4]);
                const categoryId = row[5];
                const instance = new Expense(
                    id,
                    accountId,
                    name,
                    amount,
                    date,
                    categoryId
                );
                collection.push(instance);
            } catch (error) {
                console.error('[ExpenseRepository.init] ERROR', error);
                ok = false;
            }
        });

        this._collection.push(...collection);

        return ok;
    }
    async saveCollection(collection: Expense[]): Promise<boolean> {
        const ok = true;
        try {
            const header = 'id,accountId,name,amount,date,categoryId\n';
            const data: string = collection
                .map((a) => Object.values(a).join(','))
                .join('\n');
            await fs.writeFile(this._filePath, header + data, {
                encoding: 'utf8'
            });
            return ok;
        } catch (error) {
            console.error('[ExpenseRepository.saveCollection] ERROR', error);
            return !ok;
        }
    }
}
