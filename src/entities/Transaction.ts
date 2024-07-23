import { Category } from './Category';
import { Entity } from './Entity';

export class Transaction extends Entity {
    public readonly name: string;
    public readonly value: number;
    public readonly date: Date;
    public readonly category: Category;

    constructor(
        name: string,
        value: number,
        date: Date,
        category: Category
    ) {
        super(Date.now().toString());
        this.name = name;
        this.value = value;
        this.date = date;
        this.category = category;
    }
}
