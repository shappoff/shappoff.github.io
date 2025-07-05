import React from "react";
import {latLngBounds} from 'leaflet'

// Define type for mapHits
interface MapHit {
    coords?: [number, number];
    length?: number;
    [key: string]: any;
}

const useMarkersBounds = (mapHits: Array<MapHit>) => {

    const [currentBounds, setCurrentBounds] = React.useState<ReturnType<typeof latLngBounds> | undefined>();

    React.useEffect(() => {
        const bounds = latLngBounds([])
        mapHits && mapHits.length && [...mapHits].forEach((item: MapHit) => {
            if (item?.coords?.length) {
                const [lat, lng] = item.coords;
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
            if (Array.isArray(item) && item.length) {
                const [,,,,lat, lng] = item;
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
        });

        mapHits.length && setCurrentBounds(bounds);
    }, [mapHits, mapHits.length]);

    return currentBounds;
};

export default useMarkersBounds;
