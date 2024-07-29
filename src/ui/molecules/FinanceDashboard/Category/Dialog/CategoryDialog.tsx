'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Category } from '@/entities/Category';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import Icon from '@/ui/atoms/icons/Icon';
import { IconEnum, IconKey } from '@/entities/Icon';
import {
    addCategory,
    deleteCategory,
    updateCategory
} from '@/controller/finance/category.controller';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { IconFormField, iconSchema } from '../../Dialog/IconForm';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    icon: iconSchema
});
interface CategoryDialogProps {
    category?: Category;
    callback: () => Promise<void>;
    children: React.ReactNode;
}

export default function CategoryDialog({
    category,
    callback,
    ...props
}: CategoryDialogProps) {
    const [open, setOpen] = useState(false);
    const categoryName = category?.name || 'New Category';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name || '',
            icon: category?.icon || 'SHAPES'
        }
    });

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                name: category?.name || '',
                icon: category?.icon || 'SHAPES'
            });
        }
    }, [form.formState, form.reset, category]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newCategory = new Category(
            category?.id || String(Date.now()), // If category exists, use its ID, else use empty string.
            values.name,
            values.icon as IconKey
        );

        const method = category ? 'PATCH' : 'POST';
        const body = JSON.stringify(newCategory);

        console.debug(`🚀 ~ onSubmit ~ Category ${method} Request`, body);

        let ok = false;
        if (category) {
            ok = await updateCategory(body);
        } else {
            ok = await addCategory(body);
        }

        if (ok) {
            await callback();
        } else {
            console.error(`🚨 ~ onSubmit ~ Category ${method} Failed`);
        }
        setOpen(false);
    }

    async function onDelete() {
        if (!category) return;
        await deleteCategory(category.id);
        form.reset();
        await callback();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    form.reset();
                }
                setOpen((prev) => !prev);
            }}
        >
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='inline-flex gap-2 items-center'>
                        <Icon icon={category?.icon || 'SHAPES'} />{' '}
                        {categoryName}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to the category &quot;{categoryName}
                        &quot; here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        {/* Form Body Start */}
                        <div className='grid gap-4 py-4'>
                            {/* Category Name */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    field.value || categoryName
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The category name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Category Icon */}
                            <IconFormField form={form} />
                            {/* Form Body End */}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant='destructive'
                                    onClick={onDelete}
                                    disabled={!category}
                                >
                                    Delete
                                </Button>
                            </DialogClose>
                            <Button
                                type='submit'
                                className={
                                    form.formState.isValid ? '' : 'text-red-500'
                                }
                            >
                                {category ? 'Save changes' : 'Create category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
