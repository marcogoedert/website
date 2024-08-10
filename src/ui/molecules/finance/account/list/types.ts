import { Account } from '@/entities/Account';

export interface AccountListServerProps {
    list?: Account[];
    searchable?: boolean;
}

export interface AccountListClientProps extends AccountListServerProps {}
