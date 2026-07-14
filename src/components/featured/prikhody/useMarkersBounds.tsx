import { useMemo } from 'react';
import { latLngBounds } from 'leaflet';

import { resolveMapHitCoordinates } from './resolveMapHitCoordinates';

const useMarkersBounds = (mapHits: unknown[]) => {
    return useMemo(() => {
        if (!mapHits.length) {
            return undefined;
        }

        const bounds = latLngBounds([]);

        mapHits.forEach((item) => {
            const coordinates = resolveMapHitCoordinates(item);

            if (coordinates) {
                bounds.extend(coordinates);
            }
        });

        return bounds.isValid() ? bounds : undefined;
    }, [mapHits]);
};

export default useMarkersBounds;
