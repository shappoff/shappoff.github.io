'use client';

import { useEffect, useState } from 'react';

import { getCatalogMarkerDetails } from '../catalogMarkerDetails';
import { CatalogDataset, MarkerDetails } from '../types';

export const useCatalogMarkerDetails = (dataset: CatalogDataset, naId: string | number) => {
    const [details, setDetails] = useState<MarkerDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getCatalogMarkerDetails(dataset, naId)
            .then((loadedDetails) => {
                if (isMounted) {
                    setDetails(loadedDetails);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [dataset, naId]);

    return { details, isLoading };
};
