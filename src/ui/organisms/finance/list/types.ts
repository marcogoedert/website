import { BadgeProps } from '@/components/ui/badge';
import { IconKey } from '@/entities/Icon';
import React from 'react';
import { NavigationItem } from '../navigation';

export interface ListItemEntity {
    id: string;
    searchValue: string;
    icon: IconKey;
    title: string;
    description?: string;
    badges?: {
        icon?: IconKey;
        className?: BadgeProps['className'];
        variant?: BadgeProps['variant'];
        text?: string;
    }[];
    text?: string;
    link?: NavigationItem;
}

export interface ListPanelServerProps {
    items: ListItemEntity[] | Record<string, ListItemEntity[]>;
    // request: {
    //     url: string;
    //     config: NextFetchRequestConfig;
    //     searchParamKeys?: string[];
    // };
    maxItems?: number;
    autoUpdateOnSearchParamsChange?: boolean;
    searchable?: boolean;
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export interface ListPanelClientProps extends ListPanelServerProps {}
