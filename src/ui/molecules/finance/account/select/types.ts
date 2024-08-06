import { Account } from '@/entities/Account';

export interface AccountSelectServerProps {
    list?: Account[];
}

export interface AccountSelectClientProps extends AccountSelectServerProps {
    list: Account[];
}
