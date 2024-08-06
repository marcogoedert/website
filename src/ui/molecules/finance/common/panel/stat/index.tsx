import Icon from '@/ui/atoms/icons/Icon';
import { Panel, PanelContent, PanelHeader, PanelTitle } from '..';
import { PanelStatProps } from './types';

export function PanelStat({ stat }: PanelStatProps): JSX.Element {
    const { title, value, icon } = stat;
    return (
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
    );
}
