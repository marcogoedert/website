import { Entity } from './Entity';

export class Income extends Entity {
    public readonly accountId: string;
    public readonly name: string;
    public readonly amount: number;
    public readonly date: Date;
    public readonly categoryId: string;

    constructor(
        id: string,
        accountId: string,
        name: string,
        amount: number,
        date: Date,
        categoryId: string
    ) {
        super(id);
        this.accountId = accountId;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.categoryId = categoryId;
    }

    public toCSV(): string {
        return `${this.id},${this.accountId},${this.name},${
            this.amount
        },${this.date.toISOString()},${this.categoryId}`;
    }
}
