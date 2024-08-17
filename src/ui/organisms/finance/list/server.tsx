import { ListPanelClient } from './client';
import { ListPanelServerProps } from './types';
import { Suspense } from 'react';

export async function ListPanelServer<T>({
    ...props
}: ListPanelServerProps): Promise<JSX.Element> {
    return (
        <Suspense fallback={<div>Loading list panel...</div>}>
            <ListPanelClient {...props} />
        </Suspense>
    );
}
