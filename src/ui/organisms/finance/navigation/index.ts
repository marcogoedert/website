import { financePages } from './data';
import { NavigationHorizontal } from './horizontal';
import { NavigationVertical } from './vertical';
import type { NavigationProps, NavigationItem } from './types';

export const Navigation = {
    Horizontal: NavigationHorizontal,
    Vertical: NavigationVertical
};
export { financePages };
export type { NavigationProps, NavigationItem };
