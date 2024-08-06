import { PanelStat } from '@/ui/molecules/finance/common/panel/stat';
import { StatsPanelsProps } from './types';
import { Grid } from '@/ui/templates/grid';

export function Stats({ stats }: StatsPanelsProps): JSX.Element {
    return (
        <Grid>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className='col-span-12 sm:col-span-3'
                >
                    <PanelStat stat={stat} />
                </div>
            ))}
        </Grid>
    );
}
