import { IncomeListServer as IncomeList } from './server';
import { IncomeListClient } from './client';
import type {
    IncomeListServerProps,
    IncomeListClientProps
} from './types';

export type { IncomeListServerProps, IncomeListClientProps };
export { IncomeListClient };
export default IncomeList;
