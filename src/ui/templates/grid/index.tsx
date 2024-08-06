import { cn } from '@/lib/utils';
import React from 'react';

const Grid = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('grid grid-cols-12 gap-4 items-stretch', className)}
        {...props}
    />
));
Grid.displayName = 'Grid';

const GridArticle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'grid items-stretch gap-x-4 gap-y-24 grid-cols-[1fr_minmax(auto,880px)_1fr]',
            className
        )}
        {...props}
    />
));
GridArticle.displayName = 'GridArticle';

export { Grid, GridArticle };
