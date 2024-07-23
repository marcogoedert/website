import { Entity } from './Entity';
import { IconKey } from './Icon';

export class Category extends Entity {
    public readonly name: string;
    public readonly icon: IconKey;

    constructor(id: string, name: string, icon: IconKey) {
        super(id);
        this.name = name;
        this.icon = icon;
    }
}
