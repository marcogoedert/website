import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import { Switch } from '@/ui/atoms/switch';
import { z } from 'zod';

export const switchSchema = z.boolean();

interface SwitchFormProps {
    form: any;
    name: string;
    title: string;
    description?: string;
}

export function SwitchFormField({
    form,
    name,
    title,
    description
}: SwitchFormProps): JSX.Element {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                        <FormLabel className='text-base'>{title}</FormLabel>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
