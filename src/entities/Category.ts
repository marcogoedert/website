import { Entity } from './Entity';

export enum CategoryIconEnum {
    BIKE = 'bike',
    BONE = 'bone',
    CAR = 'car',
    CREDIT_CARD = 'credit-card',
    DRAMA = 'drama',
    HAND_HEART = 'hand-heart',
    HEALTH = 'health',
    HOME = 'home',
    HOSPITAL = 'hospital',
    LANDMARK = 'landmark',
    PAW_PRINT = 'paw-print',
    SHAPES = 'shapes',
    SHIELD_ALERT = 'shield-alert',
    SHOPPING_BAG = 'shopping-bag',
    SHOPPING_BASKET = 'shopping-basket',
    SPROUT = 'sprout'
}

export type CategoryIcon = keyof typeof CategoryIconEnum;

export class Category extends Entity {
    public readonly name: string;
    // icon type is CategoryIconEnum values
    public readonly icon: CategoryIcon;

    constructor(id: string, name: string, icon: CategoryIcon) {
        super(id);
        this.name = name;
        this.icon = icon;
    }
}
