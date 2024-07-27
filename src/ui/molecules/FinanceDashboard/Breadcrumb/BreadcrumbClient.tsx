'use client';

import * as React from 'react';
import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { usePathname, useSearchParams } from 'next/navigation';

export function BreadcrumbClient() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const paths = [
        { href: '/', label: 'Home' },
        ...pathname
            .split('/')
            .filter(Boolean)
            .map((path, index, array) => {
                return {
                    href: `/${array.slice(0, index + 1).join('/')}`,
                    label: path.charAt(0).toUpperCase() + path.slice(1)
                };
            })
    ];

    const breadcrumbItems: React.ReactNode[] = [];
    paths.forEach((path, index) => {
        if (index < paths.length - 1) {
            breadcrumbItems.push(
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        asChild
                        className='max-w-20 truncate md:max-w-none'
                    >
                        <Link
                            href={
                                index === 0 || searchParams.size === 0
                                    ? path.href
                                    : `${path.href}?${new URLSearchParams(
                                          searchParams
                                      )}`
                            }
                        >
                            {path.label}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            );

            breadcrumbItems.push(
                <BreadcrumbSeparator key={`separator-${index}`} />
            );
        } else {
            breadcrumbItems.push(
                <BreadcrumbPage key={index}>{path.label}</BreadcrumbPage>
            );
        }
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
        </Breadcrumb>
    );
}
