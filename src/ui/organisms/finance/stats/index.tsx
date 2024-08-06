import { PanelStat } from '@/ui/molecules/finance/common/panel/stat';
import { StatsPanelsProps } from './types';

export function Stats({ stats }: StatsPanelsProps): JSX.Element {
    return (
        <div className='grid grid-cols-12 gap-2 w-full'>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className='col-span-12 sm:col-span-4'
                >
                    <PanelStat stat={stat} />
                </div>
            ))}
        </div>
    );
}
