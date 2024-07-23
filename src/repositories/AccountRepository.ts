import fs from 'fs/promises';
import { parse } from 'csv-parse';

import { EntityRepository } from './base/EntityRepository';
import { Account } from '@/entities/Account';
import { IconKey } from '@/entities/Icon';

export class AccountRepository extends EntityRepository<Account> {
    private _filePath: string;

    public constructor(filePath: string) {
        super();
        this._filePath = filePath;
    }

    async init(): Promise<boolean> {
        let ok = true;
        const collection: Account[] = [];

        const content = await fs.readFile(this._filePath, 'utf8');
        const records = parse(content, { delimiter: ',', from_line: 2 });

        await records.forEach((row: string[]) => {
            try {
                const instance = new Account(
                    row[0],
                    row[1],
                    row[2] as IconKey,
                    row[3] || undefined,
                    row[4] || undefined
                );
                collection.push(instance);
            } catch (error) {
                console.error('[AccountRepository.init] ERROR', error);
                ok = false;
            }
        });

        this._collection.push(...collection);

        return ok;
    }
    async saveCollection(collection: Account[]): Promise<boolean> {
        const ok = true;
        try {
            const header = 'id,name,icon,walletId,creditCardId\n';
            const data: string = collection
                .map((a) => Object.values(a).join(','))
                .join('\n');
            await fs.writeFile(this._filePath, header + data, 'utf8');
            return ok;
        } catch (error) {
            console.error('[AccountRepository.saveCollection] ERROR', error);
            return !ok;
        }
    }
}
