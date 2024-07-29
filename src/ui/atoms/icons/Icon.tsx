import { IconKey } from '@/entities/Icon';
import {
    Bike,
    Bone,
    Car,
    Check,
    CreditCard,
    Cross,
    Drama,
    HandHeart,
    Home,
    Hospital,
    Landmark,
    PawPrint,
    PiggyBank,
    Plus,
    Shapes,
    ShieldAlert,
    ShoppingBag,
    ShoppingBasket,
    Sprout,
    Wallet,
    X
} from 'lucide-react';

function getIcon(iconName: IconKey) {
    switch (iconName) {
        case 'BIKE':
            return Bike;
        case 'BONE':
            return Bone;
        case 'CAR':
            return Car;
        case 'CHECK':
            return Check;
        case 'CREDIT_CARD':
            return CreditCard;
        case 'DRAMA':
            return Drama;
        case 'HAND_HEART':
            return HandHeart;
        case 'HEALTH':
            return Cross;
        case 'HOME':
            return Home;
        case 'HOSPITAL':
            return Hospital;
        case 'LANDMARK':
            return Landmark;
        case 'PAW_PRINT':
            return PawPrint;
        case "PIGGY_BANK":
            return PiggyBank
        case 'PLUS':
            return Plus
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
        case 'WALLET':
            return Wallet
        case 'X':
            return X;
    }
}

interface IconProps extends React.HTMLAttributes<SVGSVGElement>{
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
    
    return <IconComponent {...props} {...settings} />;
}
