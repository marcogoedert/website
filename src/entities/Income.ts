import { Category } from './Category';
import { Transaction } from './Transaction';

export class Income extends Transaction {

    constructor(
        name: string,
        date: Date,
        category: Category,
        value: number
    ) {
        super(name, value, date, category);
        
    }
}
