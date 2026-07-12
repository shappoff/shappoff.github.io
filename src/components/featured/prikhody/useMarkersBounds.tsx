import { useEffect, useState } from 'react';
import { latLngBounds } from 'leaflet';

import { resolveMapHitCoordinates } from './resolveMapHitCoordinates';

const useMarkersBounds = (mapHits: unknown[]) => {
    const [currentBounds, setCurrentBounds] = useState<ReturnType<typeof latLngBounds> | undefined>();

    useEffect(() => {
        if (!mapHits.length) {
            setCurrentBounds(undefined);
            return;
        }

        const bounds = latLngBounds([]);

        mapHits.forEach((item) => {
            const coordinates = resolveMapHitCoordinates(item);

            if (coordinates) {
                bounds.extend(coordinates);
            }
        });

        setCurrentBounds(bounds);
    }, [mapHits]);

    return currentBounds;
};

export default useMarkersBounds;
