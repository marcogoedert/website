import { IconKey } from '@/entities/Icon';
import Icon from '@/ui/atoms/icons/Icon';
import {
    Panel,
    PanelContent,
    PanelHeader,
    PanelTitle
} from '@/ui/molecules/FinanceDashboard/Panel';

export type Statistics = {
    title: string;
    value: number;
    icon: IconKey;
};

interface StatsPanelsProps {
    stats: Statistics[];
}

export function StatsPanels({ stats }: StatsPanelsProps): JSX.Element {
    return (
        <div className='grid grid-cols-12 gap-2 w-full'>
            {stats.map(({ title, value, icon }, index) => (
                <div
                    key={index}
                    className='col-span-12 sm:col-span-4'
                >
                    <Panel>
                        <PanelHeader className='flex-row items-center justify-between'>
                            <PanelTitle className='inline-'>{title}</PanelTitle>
                            <Icon
                                icon={icon}
                                iconSettings={{ size: 20 }}
                            />
                        </PanelHeader>
                        <PanelContent>
                            <p className='text-4xl font-bold'>
                                {value < 0 && '-'}${Math.abs(value).toFixed(2)}
                            </p>
                        </PanelContent>
                    </Panel>
                </div>
            ))}
        </div>
    );
}
