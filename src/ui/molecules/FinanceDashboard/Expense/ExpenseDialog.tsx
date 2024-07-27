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
    addExpense,
    deleteExpense,
    updateExpense
} from '@/controller/finance/expenses.controller';
import { Category } from '@/entities/Category';
import { Expense } from '@/entities/Expense';
import { IconEnum, IconKey } from '@/entities/Icon';
import { cn } from '@/lib/utils';
import Icon from '@/ui/atoms/icons/Icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    amount: z.coerce.number().min(0).max(1000000),
    date: z.coerce.date(),
    categoryId: z.string().min(1).max(50)
});

interface ExpenseDialogProps extends ButtonProps {
    expense?: Expense;
    categories: Category[];
    callback: () => Promise<void>;
}

export default function ExpenseDialog({
    expense,
    categories,
    callback,
    ...props
}: ExpenseDialogProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const expenseName = expense?.name || 'New Expense';
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: expense?.name || '',
            amount: expense?.amount || 0,
            date: expense?.date ? new Date(expense.date) : new Date(Date.now()),
            categoryId: expense?.categoryId || ''
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newExpense = new Expense(
            expense?.id || String(Date.now()),
            searchParams.get('bankAccount') || '0',
            values.name,
            values.amount,
            values.date,
            values.categoryId
        );

        const method = expense ? 'PATCH' : 'POST';
        const body = JSON.stringify(newExpense);

        let ok = false;
        if (expense) {
            ok = await updateExpense(body);
        } else {
            ok = await addExpense(body);
        }

        if (ok) {
            await callback();
        } else {
            console.error(`🚨 ~ onSubmit ~ Expense ${method} Failed`);
        }
        form.reset();
        setOpen(false);
    }

    async function onDelete() {
        if (!expense) return;
        await deleteExpense(expense.id);
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
                        <Icon icon={'SHAPES'} /> {expenseName}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to the expense &quot;{expenseName}
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
                            {/* Expense Name */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={expenseName}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of the expense.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Expense Amount */}
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                placeholder='0'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The amount of the expense.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Expense Date */}
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
                                                                'eeee, d LLL y'
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
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01'
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            The date the expense was made.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Expense Category */}
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
                                                                    )?.icon ||
                                                                    'SHOPPING_BASKET'
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
                                            <PopoverContent align='start' className='p-0 w-[240px]'>
                                                <Command>
                                                    <CommandInput placeholder='Search icons...' />
                                                    <CommandEmpty>
                                                        No categories found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        <CommandList>
                                                            {categories.map(
                                                                (category) => (
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
                                            The category of this expense.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Form Body End */}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant='destructive'
                                    onClick={onDelete}
                                    disabled={!expense}
                                >
                                    Delete
                                </Button>
                            </DialogClose>
                            <Button
                                type='submit'
                                className={
                                    form.formState.isSubmitted &&
                                    !form.formState.isValid
                                        ? 'text-red-500'
                                        : ''
                                }
                            >
                                {expense ? 'Save changes' : 'Create expense'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
