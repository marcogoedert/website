import PanelContainer, { PanelContainerProps } from '../PanelContainer';

interface NumericPanelProps
    extends Omit<PanelContainerProps, 'children' | 'subtitle'> {
    value: number;
    type: 'default' | 'currency';
}

export function NumericPanel({
    value,
    title,
    type = 'default'
}: NumericPanelProps): JSX.Element {
    let prefix = '';

    if (type === 'currency') {
        if (value < 0) {
            prefix = '-$';
            value = Math.abs(value);
        } else {
            prefix = '$';
        }
    }

    return (
        <PanelContainer title={title}>
            <p className='text-4xl font-bold'>
                {prefix}
                {value.toFixed(2)}
            </p>
        </PanelContainer>
    );
}
