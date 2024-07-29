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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    addAccount,
    deleteAccount,
    updateAccount
} from '@/controller/finance/account.controller';
import { Account } from '@/entities/Account';
import Icon from '@/ui/atoms/icons/Icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    IconFormField,
    iconSchema,
    iconSchemaDefaultValue
} from '../Dialog/IconForm';
import { SwitchFormField } from '../Dialog/SwitchForm';
import { IconKey } from '@/entities/Icon';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    icon: iconSchema,
    enableWallet: z.boolean().default(false).optional(),
    enableCreditCard: z.boolean().default(false).optional()
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
                  icon: account.icon,
                  enableWallet: !!account.walletId,
                  enableCreditCard: !!account.creditCardId
              }
            : undefined
    });

    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        let newAccount: Account;

        if (!account) {
            console.log('Creating new account', values);
            newAccount = new Account(
                String(Date.now()),
                values.name,
                values.icon as IconKey,
                values.enableWallet ? `wallet-${Date.now()}` : '',
                values.enableCreditCard ? `credit-${Date.now()}` : ''
            );
        } else {
            const hasWallet = !!account.walletId;
            const hasCreditCard = !!account.creditCardId;

            const walletId = values.enableWallet
                ? hasWallet
                    ? account.walletId
                    : `wallet-${Date.now()}`
                : '';
            const creditCardId = values.enableCreditCard
                ? hasCreditCard
                    ? account.creditCardId
                    : `credit-${Date.now()}`
                : '';
            newAccount = new Account(
                account.id,
                values.name,
                values.icon as IconKey,
                walletId,
                creditCardId
            );
        }

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
            const method = account ? 'PATCH' : 'POST';
            console.error(`🚨 ~ onSubmit ~ Account ${method} Failed`);
        }
        setOpen(false);
    }, []);

    async function onDelete() {
        if (!account) return;
        await deleteAccount(account.id);
        await callback();
    }

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            console.log('[useEffect] formState:', form.formState);
            console.log(
                '[useEffect] isSubmitSuccessful:',
                form.formState.isSubmitSuccessful
            );
            console.log('[useEffect] account:', account);
            form.reset({
                name: account?.name || '',
                icon: account?.icon || 'SHAPES',
                enableWallet: !!account?.walletId,
                enableCreditCard: !!account?.creditCardId
            });
        }
    }, [form.formState, form.reset, account]);

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
                        <Icon icon={account?.icon || iconSchemaDefaultValue} />{' '}
                        {accountName}
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
                        <div className='grid gap-4'>
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
                                        <FormDescription>
                                            The name of the bank account
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Account Icon */}
                            <IconFormField form={form} />
                            <SwitchFormField
                                form={form}
                                name='enableWallet'
                                title='Wallet'
                                description='Enable wallet for this bank account'
                            />
                            <SwitchFormField
                                form={form}
                                name='enableCreditCard'
                                title='Credit Card'
                                description='Enable credit card for this bank account'
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
