import { BadgeProps } from '@/components/ui/badge';
import { IconKey } from '@/entities/Icon';
import React from 'react';

export interface ListPanelServerProps<T> {
    items: T[] | { [key: string]: T[] };
    transform: (item: T) => {
        id: string;
        searchValue: string;
        icon: IconKey;
        title: string;
        description?: string;
        badges?: BadgeProps[];
        text?: string;
    };
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

export interface ListPanelClientProps<T> extends ListPanelServerProps<T> {}
