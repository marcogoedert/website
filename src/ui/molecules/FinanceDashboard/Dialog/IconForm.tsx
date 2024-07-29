import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { IconEnum, IconKey } from '@/entities/Icon';
import { cn } from '@/lib/utils';
import Icon from '@/ui/atoms/icons/Icon';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

export const iconSchema = z
    .string()
    .refine((iconName) => Object.keys(IconEnum).includes(iconName), {
        message: 'Invalid Icon Name'
    });

export const iconSchemaDefaultValue: IconKey = 'SHAPES';

interface IconFormProps {
    form: any;
}

export function IconFormField({ form }: IconFormProps): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={form.control}
            name='icon'
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel>Icon</FormLabel>
                    <Popover
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    <span className='inline-flex items-center justify-between'>
                                        {field.value ? (
                                            <>
                                                <Icon
                                                    icon={
                                                        field.value as IconKey
                                                    }
                                                    className='mr-4'
                                                />
                                                {
                                                    IconEnum[
                                                        field.value as IconKey
                                                    ]
                                                }
                                            </>
                                        ) : (
                                            'Select an icon to display'
                                        )}
                                    </span>
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            align='start'
                            className='w-[200px] p-0'
                        >
                            <Command>
                                <CommandInput
                                    placeholder={`Search ${
                                        Object.keys(IconEnum).length
                                    } icons...`}
                                />
                                <CommandEmpty>No icons found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandList>
                                        {Object.keys(IconEnum).map((icon) => (
                                            <CommandItem
                                                value={icon}
                                                key={icon}
                                                onSelect={() => {
                                                    form.setValue('icon', icon);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        icon === field.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                <Icon
                                                    icon={icon as IconKey}
                                                    className='mr-2'
                                                />
                                                {IconEnum[icon as IconKey]}
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>The icon to display</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
