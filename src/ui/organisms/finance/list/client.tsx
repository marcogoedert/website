'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { ListItemEntity, ListPanelClientProps } from './types';
import { cn } from '@/lib/utils';
import {
    List,
    ListItem,
    ListItemAmount,
    ListItemContent,
    ListItemDescription,
    ListItemIcon,
    ListItemText,
    ListItemTitle
} from '@/ui/molecules/finance/common/list';
import Icon from '@/ui/atoms/icons/Icon';
import { Badge } from '@/components/ui/badge';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
// import { useListPanel } from '@/hooks/use-list-panel';
// import { useDialogContext } from '@/context/dialog';
// import { NavigationItem } from '../navigation';
// import Link from 'next/link';

// 1 - Fn: Build the row component with T type
// 2 - Fn: Group rows by T attribute

// type GroupedItems = { [key: string]: Income[] };

// function groupItemsByMonth(items: Income[]): GroupedItems {
//     const dict: GroupedItems = {};
//     return items.reduce((acc, item) => {
//         const key = format(item.date, 'MMMM yyyy');
//         if (!dict[key]) {
//             dict[key] = [];
//         }
//         dict[key].push(item);
//         return dict;
//     }, dict);
// }

export function ListPanelClient({
    items,
    searchable = false,
    className
}: // request,
// maxItems,
// autoUpdateOnSearchParamsChange,
ListPanelClientProps): JSX.Element {
    // const { values, callback } = useListPanel<T>({
    //     items,
    //     // request,
    //     maxItems,
    //     autoUpdateOnSearchParamsChange
    // });
    const searchParams = useSearchParams();
    const router = useRouter();
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
    }, []);

    const getListItem = useCallback((value: ListItemEntity) => {
        const { id, searchValue, icon, title, description, badges, text } =
            value;
        console.log('[Item] ', searchValue);
        let url = '';
        if (value.link && value.link.href) {
            const { href, hash } = value.link;
            url = href;
            if (searchParams.size > 0) {
                url += `?${searchParams.toString()}`;
            }
            if (hash) {
                url += `#${hash}`;
            }
        }

        return (
            <CommandItem
                key={id}
                value={searchValue}
                asChild
            >
                <ListItem onClick={() => (url ? router.push(url) : null)}>
                    <ListItemIcon>
                        <Icon icon={icon} />
                    </ListItemIcon>
                    <ListItemText>
                        <ListItemTitle>{title}</ListItemTitle>
                        {description && (
                            <ListItemDescription>
                                {description}
                            </ListItemDescription>
                        )}
                    </ListItemText>
                    <ListItemContent>
                        {badges?.map((badge, index) => (
                            <Badge
                                key={index}
                                variant={badge.variant}
                                className={cn(badge.className)}
                            >
                                {badge.icon && (
                                    <Icon
                                        icon={badge.icon}
                                        className='mr-1'
                                    />
                                )}
                                {badge.text}
                            </Badge>
                        ))}
                        {text && <ListItemAmount>{text}</ListItemAmount>}
                    </ListItemContent>
                </ListItem>
            </CommandItem>
        );
    }, []);

    return (
        <Command className={cn(className)}>
            {searchable && <CommandInput placeholder='Search incomes...' />}
            <CommandEmpty>No incomes found.</CommandEmpty>
            <CommandList className='max-h-full'>
                <List>
                    {Array.isArray(items)
                        ? items.map((item) => getListItem(item))
                        : Object.entries(items).map(([key, values]) => (
                              <CommandGroup
                                  key={key}
                                  heading={key}
                              >
                                  <div
                                      id={key}
                                      className='scroll-m-36'
                                  />
                                  {values.map((item) => getListItem(item))}
                              </CommandGroup>
                          ))}
                </List>
            </CommandList>
        </Command>
    );
}
