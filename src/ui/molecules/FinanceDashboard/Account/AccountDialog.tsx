import { Button, ButtonProps } from '@/components/ui/button';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    addAccount,
    deleteAccount,
    updateAccount
} from '@/controller/finance/account.controller';
import { Account } from '@/entities/Account';
import { IconEnum, IconKey } from '@/entities/Icon';
import { cn } from '@/lib/utils';
import Icon from '@/ui/atoms/icons/Icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    icon: z.string()
});

interface AccountDialogProps extends ButtonProps {
    account?: Account;
    callback: () => Promise<void>;
}

export default function AccountDialog({
    account,
    callback,
    ...props
}: AccountDialogProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const accountName = account?.name || 'New Account';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: account
            ? {
                  name: account.name,
                  icon: account.icon
              }
            : undefined
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newAccount = new Account(
            account?.id || String(Date.now()),
            values.name,
            values.icon as IconKey,
            undefined,
            undefined
        );

        const method = account ? 'PATCH' : 'POST';
        const body = JSON.stringify(newAccount);

        let ok = false;
        if (account) {
            ok = await updateAccount(body);
        } else {
            ok = await addAccount(body);
        }

        if (ok) {
            
            await callback();
        } else {
            console.error(`🚨 ~ onSubmit ~ Account ${method} Failed`);
        }
        form.reset();
        setOpen(false);
    }

    async function onDelete() {
        if (!account) return;
        await deleteAccount(account.id);
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
            <DialogTrigger asChild>
                {props.children}
                {/* <Button
                    {...props}
                    className={cn(
                        'inline-flex gap-2 w-full items-center justify-start ',
                        props.className
                    )}
                >
                    <Icon icon={account?.icon || 'SHAPES'} />
                    {accountName}
                </Button> */}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='inline-flex gap-2 items-center'>
                        <Icon icon={account?.icon || 'SHAPES'} /> {accountName}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to the account &quot;{accountName}
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
                            {/* Account Name */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={accountName}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Account Icon */}
                            <FormField
                                control={form.control}
                                name='icon'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select an icon to display' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='grid grid-cols-3'>
                                                {Object.keys(IconEnum).map(
                                                    (icon) => (
                                                        <SelectItem
                                                            key={icon}
                                                            value={icon}
                                                            className='col-span-1'
                                                        >
                                                            <span className='inline-flex w-full gap-2 items-center'>
                                                                <Icon
                                                                    icon={
                                                                        icon as IconKey
                                                                    }
                                                                />
                                                            </span>
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
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
                                    disabled={!account}
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
                                {account ? 'Save changes' : 'Create account'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
