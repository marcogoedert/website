import { Button, ButtonProps } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
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
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
    addIncome,
    deleteIncome,
    updateIncome
} from '@/controller/finance/incomes.controller';
import { Category } from '@/entities/Category';
import { Income } from '@/entities/Income';
import { cn } from '@/lib/utils';
import Icon from '@/ui/atoms/icons/Icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { dateSchema, dateSchemaDefaultValue } from '../Dialog/DateForm';
import { findIconByCategory } from '@/lib/finance/category';
import { formatAmount, parseFormattedAmount } from '@/lib/finance/income';
import { Badge } from '@/components/ui/badge';

const MIN_DATE = new Date('1998-02-11');
const MAX_DATE = new Date('2038-02-11');

const formSchema = z.object({
    name: z.string().min(2).max(50),
    amount: z
        .string({
            required_error: 'Amount is required'
        })
        .refine(
            (value) => {
                const replacedValue = value.replace(/\D/g, '');
                return !!Number(replacedValue);
            },
            {
                message: 'Amount must be a number'
            }
        ),
    date: dateSchema,
    categoryId: z.string().min(1).max(50)
});

type LooseIncome = Omit<Income, 'id'> & { id?: string };

interface IncomeDialogProps extends ButtonProps {
    income?: LooseIncome;
    categories: Category[];
    callback: () => Promise<void>;
}

export default function IncomeDialog({
    income,
    categories,
    callback,
    ...props
}: IncomeDialogProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [virtualIncome, setVirtualIncome] = useState<LooseIncome | null>(
        income || null
    );
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: virtualIncome?.name || '',
            amount: formatAmount(virtualIncome?.amount),
            date: virtualIncome?.date
                ? new Date(virtualIncome.date)
                : dateSchemaDefaultValue,
            categoryId: virtualIncome?.categoryId || ''
        }
    });

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            const newIncome = new Income(
                virtualIncome?.id || String(Date.now()),
                searchParams.get('bankAccount') || '0',
                values.name,
                parseFormattedAmount(values.amount),
                values.date,
                values.categoryId
            );

            const method = virtualIncome?.id ? 'PATCH' : 'POST';
            const body = JSON.stringify(newIncome);

            let ok = false;
            if (method === 'PATCH') {
                ok = await updateIncome(body);
            } else {
                ok = await addIncome(body);
            }

            if (ok) {
                await callback();
            } else {
                console.error(`🚨 ~ onSubmit ~ Income ${method} Failed`);
            }
            form.reset();
            setOpen(false);
        },
        [virtualIncome, callback, form, searchParams]
    );

    const onDelete = useCallback(async () => {
        if (!virtualIncome || !virtualIncome?.id) return;
        await deleteIncome(virtualIncome.id);
        form.reset();
        await callback();
    }, [virtualIncome, form, callback]);

    const onDuplicate = useCallback(() => {
        setVirtualIncome((prev) =>
            prev
                ? {
                      ...prev,
                      name: `${virtualIncome?.name} (Copy)`,
                      id: undefined
                  }
                : null
        );
        form.reset({
            name: `${virtualIncome?.name} (Copy)`,
            amount: formatAmount(virtualIncome?.amount),
            date: virtualIncome?.date
                ? new Date(virtualIncome.date)
                : new Date(Date.now()),
            categoryId: virtualIncome?.categoryId || ''
        });
        setOpen(true);
    }, [form]);

    const onDialogOpenChange = useCallback(
        (isOpen: boolean) => {
            if (!isOpen) {
                form.reset({
                    name: income?.name || '',
                    amount: formatAmount(income?.amount),
                    date: income?.date
                        ? new Date(income.date)
                        : new Date(Date.now()),
                    categoryId: income?.categoryId || ''
                });
                setVirtualIncome(income || null);
            }
            setOpen((prev) => !prev);
        },
        [form]
    );

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            setVirtualIncome(income ? { ...income } : null);
            form.reset({
                name: income?.name || '',
                amount: formatAmount(income?.amount),
                date: income?.date
                    ? new Date(income.date)
                    : new Date(Date.now()),
                categoryId: income?.categoryId || ''
            });
        }
    }, [form.formState, form.reset, income]);

    return (
        <Dialog
            open={open}
            onOpenChange={onDialogOpenChange}
        >
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogPortal>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle className='inline-flex gap-2 items-center'>
                            <Icon
                                icon={findIconByCategory(
                                    categories,
                                    virtualIncome?.categoryId
                                )}
                            />{' '}
                            {virtualIncome?.name || 'New Income'}
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to the income &quot;
                            {virtualIncome?.name || 'New Income'}
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
                            <div className='grid gap-4'>
                                {/* Income Name */}
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        virtualIncome?.name ||
                                                        'New Income'
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                The name of the income.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Income Amount */}
                                <FormField
                                    control={form.control}
                                    name='amount'
                                    render={({
                                        field: { onChange, ...props }
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...props}
                                                    placeholder='11.02'
                                                    onChange={(e) => {
                                                        const { value } =
                                                            e.target;
                                                        e.target.value =
                                                            formatAmount(value);
                                                        onChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                The amount of the income.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Income Date */}
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
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    'd LLL y, eeee'
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
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
                                                        defaultMonth={
                                                            field.value
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date > MAX_DATE ||
                                                            date < MIN_DATE
                                                        }
                                                        initialFocus
                                                        captionLayout='dropdown-buttons'
                                                        fromYear={MIN_DATE.getFullYear()}
                                                        toYear={MAX_DATE.getFullYear()}
                                                        fromMonth={MIN_DATE}
                                                        toMonth={MAX_DATE}
                                                        labels={{
                                                            labelMonthDropdown:
                                                                () => '',
                                                            labelYearDropdown:
                                                                () => ''
                                                        }}
                                                        classNames={{
                                                            caption_dropdowns:
                                                                'flex gap-1',
                                                            caption_label:
                                                                'hidden',
                                                            dropdown:
                                                                'text-center border'
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                The date the income was
                                                received.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Income Category */}
                                <FormField
                                    control={form.control}
                                    name='categoryId'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>Category</FormLabel>
                                            <Popover
                                                open={categoryOpen}
                                                onOpenChange={setCategoryOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            aria-expanded={
                                                                categoryOpen
                                                            }
                                                            variant='outline'
                                                            role='combobox'
                                                            className={cn(
                                                                ' justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            <span className='inline-flex items-center justify-between'>
                                                                <Icon
                                                                    icon={
                                                                        categories.find(
                                                                            (
                                                                                category
                                                                            ) =>
                                                                                category.id ===
                                                                                field.value
                                                                        )
                                                                            ?.icon ||
                                                                        'SHAPES'
                                                                    }
                                                                    className='mr-4'
                                                                />
                                                                {field.value
                                                                    ? categories.find(
                                                                          (
                                                                              category
                                                                          ) =>
                                                                              category.id ===
                                                                              field.value
                                                                      )?.name
                                                                    : 'Select category...'}
                                                            </span>
                                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align='start'
                                                    className='p-0 w-[240px]'
                                                >
                                                    <Command>
                                                        <CommandInput placeholder='Search icons...' />
                                                        <CommandEmpty>
                                                            No categories found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandList>
                                                                {categories.map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                category.id
                                                                            }
                                                                            key={
                                                                                category.id
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'categoryId',
                                                                                    category.id
                                                                                );
                                                                                setCategoryOpen(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    category.id ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0'
                                                                                )}
                                                                            />
                                                                            <Icon
                                                                                icon={
                                                                                    category.icon
                                                                                }
                                                                                className='mr-2'
                                                                            />
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandList>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                The category of this income.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Form Body End */}
                            </div>
                            <DialogFooter>
                                {!(
                                    !virtualIncome ||
                                    !virtualIncome?.id ||
                                    form.formState.isSubmitting
                                ) && (
                                    <Button
                                        type='button'
                                        disabled={
                                            !virtualIncome ||
                                            !virtualIncome?.id ||
                                            form.formState.isSubmitting
                                        }
                                        className={
                                            form.formState.isSubmitted &&
                                            !form.formState.isValid
                                                ? 'text-red-500'
                                                : ''
                                        }
                                        variant='outline'
                                        onClick={onDuplicate}
                                    >
                                        Duplicate
                                    </Button>
                                )}
                                {!(
                                    !virtualIncome?.id ||
                                    form.formState.isSubmitting
                                ) && (
                                    <DialogClose asChild>
                                        <Button
                                            variant='destructive'
                                            onClick={onDelete}
                                            disabled={
                                                !virtualIncome?.id ||
                                                form.formState.isSubmitting
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </DialogClose>
                                )}
                                <Button
                                    type='submit'
                                    disabled={form.formState.isSubmitting}
                                    className={
                                        form.formState.isSubmitted &&
                                        !form.formState.isValid
                                            ? 'text-red-500'
                                            : ''
                                    }
                                >
                                    {virtualIncome?.id
                                        ? 'Save changes'
                                        : 'Create income'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
