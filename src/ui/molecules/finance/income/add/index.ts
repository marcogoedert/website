import { IncomeAddServer as IncomeAdd } from './server';
import { IncomeAddClient } from './client';
import type { IncomeAddClientProps, IncomeAddServerProps } from './types';

export { IncomeAddClient, IncomeAdd as IncomeAddServer };
export type { IncomeAddClientProps, IncomeAddServerProps };
export default IncomeAdd;
