import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useHash(): string {
    const [hash, setHash] = useState<string>('');
    const params = useParams();

    useEffect(() => {
        function onHashChange() {
            setHash(window.location.hash);
        }
        onHashChange();
    }, [params]);

    return hash;
}
