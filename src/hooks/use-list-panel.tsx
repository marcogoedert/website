import { get } from '@/lib/http';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseListPanelProps<T> {
    list?: T[];
    request: {
        url: string;
        config: NextFetchRequestConfig;
        searchParamKeys?: string[];
    };
    maxItems?: number;
    autoUpdateOnSearchParamsChange?: boolean;
}

export function useListPanel<T>({
    list = [],
    request,
    maxItems,
    autoUpdateOnSearchParamsChange = false
}: UseListPanelProps<T>) {
    const isMounted = useRef(false);
    const searchParams = useSearchParams();
    const [values, setValues] = useState<T[]>(list?.slice(0, maxItems) || []);

    const getSearchParams = useCallback((): URLSearchParams => {
        if (!request.searchParamKeys || request.searchParamKeys.length === 0) {
            return new URLSearchParams();
        }
        return new URLSearchParams(
            request.searchParamKeys.reduce((acc, key) => {
                const value = searchParams.get(key);
                if (value) {
                    acc[key] = value;
                }
                return acc;
            }, {} as { [key: string]: string })
        );
    }, [searchParams, request.searchParamKeys]);

    const callback = useCallback(async () => {
        const { url, config, searchParamKeys } = request;
        const urlWithParams = new URL(url);
        urlWithParams.search = getSearchParams().toString();

        const response = await get<T[]>(urlWithParams.toString(), config);
        setValues(response?.slice(0, maxItems) || []);
        console.debug(
            '[useListPanel] [callback] fetched:',
            urlWithParams.toString(),
            'response:',
            response?.slice(0, maxItems) || []
        );
    }, [request, maxItems, getSearchParams]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        console.debug('[useListPanel] useEffect: list changed');
        setValues(list?.slice(0, maxItems) || []);
    }, [list, maxItems]);

    useEffect(() => {
        if (autoUpdateOnSearchParamsChange) {
            console.debug(
                '[useListPanel] useEffect: autoUpdateOnSearchParamsChange'
            );
            callback();
        }
    }, [autoUpdateOnSearchParamsChange, searchParams]);

    return { values, callback };
}
