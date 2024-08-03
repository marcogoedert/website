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

const ListRow = React.forwardRef<
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
ListRow.displayName = 'ListRow';

const ListRowIcon = React.forwardRef<
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
ListRowIcon.displayName = 'ListRowIcon';

const ListRowText = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('ml-4 space-y-1 text-start', className)}
        {...props}
    />
));
ListRowText.displayName = 'ListRowText';

const ListRowTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm font-medium leading-none', className)}
        {...props}
    />
));
ListRowTitle.displayName = 'ListRowTitle';

const ListRowDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
ListRowDescription.displayName = 'ListRowDescription';

const ListRowAmount = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('ml-auto font-medium', className)}
        {...props}
    />
));

export {
    List,
    ListRow,
    ListRowIcon,
    ListRowText,
    ListRowTitle,
    ListRowDescription,
    ListRowAmount
};
