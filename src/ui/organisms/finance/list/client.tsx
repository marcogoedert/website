import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { ListPanelClientProps } from './types';
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
import { useCallback } from 'react';
import { useListPanel } from '@/hooks/use-list-panel';

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

export function ListPanelClient<T>({
    items,
    // request,
    // maxItems,
    // autoUpdateOnSearchParamsChange,
    searchable = false,
    className,
    transform
}: ListPanelClientProps<T>): JSX.Element {
    // const { values, callback } = useListPanel<T>({
    //     items,
    //     // request,
    //     maxItems,
    //     autoUpdateOnSearchParamsChange
    // });

    const getListItem = useCallback((value: T) => {
        const { id, searchValue, icon, title, description, badges, text } =
            transform(value);
        return (
            <CommandItem
                key={id}
                value={searchValue}
                asChild
            >
                <ListItem>
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
                                {...badge}
                            />
                        ))}
                        {text && <ListItemAmount>{text}</ListItemAmount>}
                    </ListItemContent>
                </ListItem>
            </CommandItem>
        );
    }, []);

    const getList = useCallback((key: string, values: T[]): JSX.Element => {
        return (
            <CommandList
                className='gap-1'
                key={`list-${key}`}
            >
                <List>{values.map((value) => getListItem(value))}</List>
            </CommandList>
        );
    }, []);

    const getGroup = useCallback((key: string, values: T[]): JSX.Element => {
        return (
            <CommandGroup
                key={key}
                heading={key !== 'all' ? key : undefined}
            >
                <div
                    id={key}
                    className='scroll-m-36'
                />
                {getList(key, values)}
            </CommandGroup>
        );
    }, []);

    return (
        <Command className={cn(className)}>
            {searchable && <CommandInput placeholder='Search incomes...' />}
            <CommandEmpty>No incomes found.</CommandEmpty>

            {Array.isArray(items)
                ? getGroup('all', items)
                : Object.keys(items).map((key) => getGroup(key, items[key]))}
        </Command>
    );
}
