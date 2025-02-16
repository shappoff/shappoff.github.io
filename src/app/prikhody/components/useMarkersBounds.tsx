import React from "react";
import {latLngBounds} from 'leaflet'

const useMarkersBounds = (mapHits: Array<any>) => {

    const [currentBounds, setCurrentBounds] = React.useState<any>();

    React.useEffect(() => {
        const bounds = latLngBounds([])

        mapHits && mapHits.length && [...mapHits].forEach((item: any) => {
            const {_geoloc} = item;
            if (!_geoloc.lat) {
                return;
            }
            const {lat, lng} = _geoloc;
            bounds.extend([lat, lng])
        });

        setCurrentBounds(bounds);
    }, [mapHits, mapHits.length]);

    return currentBounds;
};

export default useMarkersBounds;