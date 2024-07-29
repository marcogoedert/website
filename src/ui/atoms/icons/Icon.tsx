import { IconKey } from '@/entities/Icon';
import {
    Apple,
    Banknote,
    Beer,
    Bike,
    Bitcoin,
    Bone,
    Cake,
    Car,
    Check,
    Cherry,
    Coffee,
    Coins,
    CreditCard,
    Cross,
    DollarSign,
    Drama,
    GraduationCap,
    HandHeart,
    HandMetal,
    Heart,
    Home,
    Hospital,
    Landmark,
    PartyPopper,
    PawPrint,
    PiggyBank,
    Plus,
    Rocket,
    Shapes,
    ShieldAlert,
    ShoppingBag,
    ShoppingBasket,
    Sprout,
    TrendingDown,
    TrendingUp,
    Utensils,
    UtensilsCrossed,
    Wallet,
    X
} from 'lucide-react';

function getIcon(iconName: IconKey) {
    switch (iconName) {
        case 'APPLE':
            return Apple;
        case 'BEER':
            return Beer;
        case 'CAKE':
            return Cake;
        case 'CHERRY':
            return Cherry;
        case 'COFFEE':
            return Coffee;
        case 'BANKNOTE':
            return Banknote;
        case 'BIKE':
            return Bike;
        case 'BITCOIN':
            return Bitcoin;
        case 'BONE':
            return Bone;
        case 'CAR':
            return Car;
        case 'CHECK':
            return Check;
        case 'COINS':
            return Coins;
        case 'CREDIT_CARD':
            return CreditCard;
        case 'DOLLAR_SIGN':
            return DollarSign;
        case 'DRAMA':
            return Drama;
        case 'GRADUATION_CAP':
            return GraduationCap;
        case 'HAND_HEART':
            return HandHeart;
        case 'HAND_METAL':
            return HandMetal;
        case 'HEALTH':
            return Cross;
        case 'HEART':
            return Heart;
        case 'HOME':
            return Home;
        case 'HOSPITAL':
            return Hospital;
        case 'LANDMARK':
            return Landmark;
        case 'PARTY_POPPER':
            return PartyPopper;
        case 'PAW_PRINT':
            return PawPrint;
        case 'PIGGY_BANK':
            return PiggyBank;
        case 'PLUS':
            return Plus;
        case 'ROCKET':
            return Rocket;
        default:
        case 'SHAPES':
            return Shapes;
        case 'SHIELD_ALERT':
            return ShieldAlert;
        case 'SHOPPING_BAG':
            return ShoppingBag;
        case 'SHOPPING_BASKET':
            return ShoppingBasket;
        case 'SPROUT':
            return Sprout;
        case 'TRENDING_DOWN':
            return TrendingDown;
        case 'TRENDING_UP':
            return TrendingUp;
        case 'UTENSILS':
            return Utensils;
        case 'UTENSILS_CROSSED':
            return UtensilsCrossed;
        case 'WALLET':
            return Wallet;
        case 'X':
            return X;
    }
}

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
    icon: IconKey;
    iconSettings?: {
        width?: number;
        strokeWidth?: number;
        size?: number;
    };
}

const iconSettingsDefault = {
    strokeWidth: 1,
    size: 22
};

export default function Icon({
    icon = 'SHAPES',
    iconSettings = iconSettingsDefault,
    ...props
}: IconProps): JSX.Element {
    const IconComponent = getIcon(icon);

    const settings = {
        ...iconSettingsDefault,
        ...iconSettings
    };

    return (
        <IconComponent
            {...props}
            {...settings}
        />
    );
}
