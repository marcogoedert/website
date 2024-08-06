import { cn } from '@/lib/utils';
import React from 'react';

const Panel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded-xl border bg-card text-card-foreground shadow col-span-3 items-center',
            className
        )}
        {...props}
    />
));
Panel.displayName = 'Panel';

const PanelHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
PanelHeader.displayName = 'PanelHeader';

const PanelTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
PanelTitle.displayName = 'PanelTitle';

const PanelDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
PanelDescription.displayName = 'PanelDescription';

const PanelContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-6 pt-0', className)}
        {...props}
    />
));
PanelContent.displayName = 'PanelContent';

export { Panel, PanelHeader, PanelTitle, PanelDescription, PanelContent };
