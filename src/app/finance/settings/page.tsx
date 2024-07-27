interface SettingsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function SettingsPage({
    searchParams
}: SettingsPageProps): JSX.Element {
    
    return (
        <div>
            <h3 className='text-lg font-medium'>Bank Accounts</h3>
            <p className='text-sm text-muted-foreground'>
                This is where you can manage your bank accounts. Your bank
                accounts are used to track your income and expenses.
            </p>
        </div>
    );
}
