import { IncomeDialogServer as IncomeDialog } from './server';
import { IncomeDialogClient } from './client';
import type { IncomeDialogClientProps, IncomeDialogServerProps } from './types';

export default IncomeDialog;
export type { IncomeDialogClientProps, IncomeDialogServerProps };
export { IncomeDialogClient, IncomeDialog as IncomeDialogServer };
