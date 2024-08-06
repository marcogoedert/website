import { IconKey } from '@/entities/Icon';

export type Stat = {
    title: string;
    value: number;
    icon: IconKey;
};

export interface PanelStatProps {
    stat: Stat;
}
