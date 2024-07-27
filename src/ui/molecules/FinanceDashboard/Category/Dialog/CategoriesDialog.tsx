'use client';

import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';
import Icon from '@/ui/atoms/icons/Icon';

interface CategoriesDialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CategoriesDialog({
    ...props
}: CategoriesDialogProps): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='inline-flex gap-2 items-center'>
                        <Icon icon={'SHAPES'} /> Manage categories
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your categories here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
            </DialogContent>
        </Dialog>
    );
}
