'use client';

import { Button, ButtonProps } from '@/components/ui/button';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Category, CategoryIcon, CategoryIconEnum } from '@/entities/Category';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Bike,
    Bone,
    Car,
    CreditCard,
    Cross,
    Drama,
    HandHeart,
    Home,
    Hospital,
    Landmark,
    PawPrint,
    Shapes,
    ShieldAlert,
    ShoppingBag,
    ShoppingBasket,
    Sprout
} from 'lucide-react';
import { deleteCategory } from '@/ui/organisms/Finance/Category/CategoryList';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    icon: z.string()
});

interface CategoryDialogProps extends ButtonProps {
    category?: Category;
    callback: () => Promise<void>;
}

function getIcon(iconName: CategoryIcon) {
    const iconSettings = {
        width: 20,
        strokeWidth: 1
    };

    switch (iconName) {
        case 'BIKE':
            return <Bike {...iconSettings} />;
        case 'BONE':
            return <Bone {...iconSettings} />;
        case 'CAR':
            return <Car {...iconSettings} />;
        case 'CREDIT_CARD':
            return <CreditCard {...iconSettings} />;
        case 'DRAMA':
            return <Drama {...iconSettings} />;
        case 'HAND_HEART':
            return <HandHeart {...iconSettings} />;
        case 'HEALTH':
            return <Cross {...iconSettings} />;
        case 'HOME':
            return <Home {...iconSettings} />;
        case 'HOSPITAL':
            return <Hospital {...iconSettings} />;
        case 'LANDMARK':
            return <Landmark {...iconSettings} />;
        case 'PAW_PRINT':
            return <PawPrint {...iconSettings} />;
        default:
        case 'SHAPES':
            return <Shapes {...iconSettings} />;
        case 'SHIELD_ALERT':
            return <ShieldAlert {...iconSettings} />;
        case 'SHOPPING_BAG':
            return <ShoppingBag {...iconSettings} />;
        case 'SHOPPING_BASKET':
            return <ShoppingBasket {...iconSettings} />;
        case 'SPROUT':
            return <Sprout {...iconSettings} />;
    }
}

export default function CategoryDialog({
    category,
    callback,
    ...props
}: CategoryDialogProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: category
            ? {
                  name: category.name,
                  icon: category.icon
              }
            : undefined
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newCategory = new Category(
            category?.id || String(Date.now()),
            values.name,
            values.icon as CategoryIcon
        );

        const method = category ? 'PATCH' : 'POST';

        const response = await fetch('http://localhost:3000/api/category', {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory),
            next: {
                tags: ['category']
            }
        });
        if (response.ok) {
            console.log(`❤️ ~ onSubmit ~ Category ${method} Success`);
            await callback();
        } else {
            console.error(`🚨 ~ onSubmit ~ Category ${method} Failed`);
        }
        form.reset();
        setOpen(false);
    }

    async function onDelete() {
        if (!category) return;
        await deleteCategory(category.id);
        form.reset();
        await callback();
    }

    const categoryName = category?.name || 'New Category';
    const iconElement = getIcon(category?.icon || 'SHAPES');

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
                <Button
                    {...props}
                    className={cn(
                        'inline-flex gap-2 w-full items-center justify-start ',
                        props.className
                    )}
                >
                    {iconElement} {categoryName}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='inline-flex gap-2 items-center'>
                        {iconElement} {categoryName}
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
                                                placeholder={categoryName}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Category Icon */}
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
                                                {Object.keys(
                                                    CategoryIconEnum
                                                ).map((icon) => (
                                                    <SelectItem
                                                        key={icon}
                                                        value={icon}
                                                        className='col-span-1'
                                                    >
                                                        <span className='inline-flex w-full gap-2 items-center'>
                                                            {getIcon(
                                                                icon as CategoryIcon
                                                            )}
                                                            {icon}
                                                        </span>
                                                    </SelectItem>
                                                ))}
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
