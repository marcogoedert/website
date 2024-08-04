import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

export const dateSchema = z.coerce.date();
export const dateSchemaDefaultValue = new Date();

interface DateFormProps {
    form: any;
}

export function DateFormField({ form }: DateFormProps): JSX.Element {
    return (
        <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        ' pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, 'eeee, d LLL y')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            className='w-auto p-0'
                            align='start'
                        >
                            <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        The date the income was received.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
