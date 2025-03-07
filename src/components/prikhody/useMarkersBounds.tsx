import React from "react";
import {latLngBounds} from 'leaflet'

const useMarkersBounds = (mapHits: Array<any>) => {

    const [currentBounds, setCurrentBounds] = React.useState<any>();

    React.useEffect(() => {
        const bounds = latLngBounds([])
        mapHits && mapHits.length && [...mapHits].forEach((item: any) => {
            const lat = item[4];
            const lng = item[5];
            if (!lat || !lng) {
                return;
            }

            bounds.extend([lat, lng]);
        });

        mapHits.length && setCurrentBounds(bounds);
    }, [mapHits, mapHits.length]);

    return currentBounds;
};

export default useMarkersBounds;
