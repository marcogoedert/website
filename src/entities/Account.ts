import { Entity } from './Entity';
import { IconKey } from './Icon';


export class Account extends Entity {
    public readonly name: string;
    public readonly icon: IconKey;
    public readonly walletId?: string;
    public readonly creditCardId?: string;

    constructor(
        id: string,
        name: string,
        icon: IconKey = 'WALLET',
        walletId?: string,
        creditCardId?: string
    ) {
        super(id);
        this.name = name;
        this.icon = icon;
        this.walletId = walletId;
        this.creditCardId = creditCardId;
    }
}
