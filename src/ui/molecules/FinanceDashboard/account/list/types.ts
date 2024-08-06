import { Account } from '@/entities/Account';

export interface AccountListServerProps {
    list?: Account[];
}

export interface AccountListClientProps extends AccountListServerProps {}
