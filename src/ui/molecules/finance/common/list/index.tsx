import { cn } from '@/lib/utils';
import React from 'react';

const List = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('space-y-1.5', className)}
            {...props}
        />
    )
);
List.displayName = 'List';

const ListItem = React.forwardRef<
    HTMLButtonElement,
    {
        type?: 'submit' | 'button' | 'reset';
    } & React.HTMLProps<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none justify-between hover:bg-accent hover:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
            className
        )}
        {...props}
    />
));
ListItem.displayName = 'ListItem';

const ListItemIcon = React.forwardRef<
    HTMLSpanElement,
    React.HTMLProps<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            'relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center space-y-0 border',
            className
        )}
        {...props}
    />
));
ListItemIcon.displayName = 'ListItemIcon';

const ListItemText = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('ml-4 space-y-1 text-start', className)}
        {...props}
    />
));
ListItemText.displayName = 'ListItemText';

const ListItemTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm font-medium leading-none', className)}
        {...props}
    />
));
ListItemTitle.displayName = 'ListItemTitle';

const ListItemDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
ListItemDescription.displayName = 'ListItemDescription';

const ListItemContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('ml-auto flex items-center gap-6', className)}
        {...props}
    />
));
ListItemContent.displayName = 'ListItemContent';

const ListItemAmount = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('font-medium', className)}
        {...props}
    />
));

export {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemTitle,
    ListItemDescription,
    ListItemContent,
    ListItemAmount
};
