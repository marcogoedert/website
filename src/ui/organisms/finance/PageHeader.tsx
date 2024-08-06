import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React from 'react';

const PageHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('pt-6 flex flex-col gap-1.5', className)}
        {...props}
    >
        {props.children}
    </div>
));
PageHeader.displayName = 'PageHeader';

const PageTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn('text-3xl font-bold tracking-tight', className)}
        {...props}
    />
));
PageTitle.displayName = 'PageTitle';

const PageDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
PageDescription.displayName = 'PageDescription';

const PageSubtitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('text-lg font-medium', className)}
        {...props}
    />
));
PageSubtitle.displayName = 'PageSubtitle';

const PageHeaderSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <Separator
        ref={ref}
        className={cn('my-6', className)}
        {...props}
    />
));
PageHeaderSeparator.displayName = 'PageHeaderSeparator';

export { PageHeader, PageTitle, PageDescription, PageSubtitle, PageHeaderSeparator };
