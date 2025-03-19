import React from "react";
import {latLngBounds} from 'leaflet'

const useMarkersBounds = (mapHits: Array<any>) => {

    const [currentBounds, setCurrentBounds] = React.useState<any>();

    React.useEffect(() => {
        const bounds = latLngBounds([])
        mapHits && mapHits.length && [...mapHits].forEach((item: any) => {
            if (item?.coords?.length) {
                const [lat, lng] = item.coords;
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
            if (item?.length) {
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
