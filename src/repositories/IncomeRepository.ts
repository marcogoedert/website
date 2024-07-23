import fs from 'fs/promises';
import { parse } from 'csv-parse';

import { EntityRepository } from './base/EntityRepository';
import { Income } from '@/entities/Income';

export class IncomeRepository extends EntityRepository<Income> {
    private _filePath: string;

    public constructor(filePath: string) {
        super();
        this._filePath = filePath;
    }

    async init(): Promise<boolean> {
        let ok = true;
        const collection: Income[] = [];

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
                const instance = new Income(
                    id,
                    accountId,
                    name,
                    amount,
                    date,
                    categoryId
                );
                collection.push(instance);
            } catch (error) {
                console.error('[IncomeRepository.init] ERROR', error);
                ok = false;
            }
        });

        this._collection.push(...collection);

        return ok;
    }
    async saveCollection(collection: Income[]): Promise<boolean> {
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
            console.error('[IncomeRepository.saveCollection] ERROR', error);
            return !ok;
        }
    }
}
