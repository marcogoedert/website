export interface PanelContainerProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function PanelContainer({
    children,
    title,
    subtitle
}: PanelContainerProps): JSX.Element {
    return (
        <div className='rounded-xl border bg-card text-card-foreground shadow col-span-3 items-center '>
            <div className='flex flex-col space-y-1.5 p-6'>
                <h3 className='font-semibold leading-none tracking-tight'>
                    {title}
                </h3>
                {subtitle && (
                    <p className='text-sm text-muted-foreground'>{subtitle}</p>
                )}
            </div>
            <div className='p-6 pt-0'>
                <div className='space-y-8'>{children}</div>
            </div>
        </div>
    );
}
