import { ButtonProps } from '@/components/ui/button';
import { Account } from '@/entities/Account';

export interface AccountDialogServerProps extends ButtonProps {
    account?: Account;
    callback?: () => Promise<void>;
}

export interface AccountDialogClientProps extends AccountDialogServerProps {}
