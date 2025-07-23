import React from "react";
import { useMap } from "react-leaflet";
import {throttle} from "./throttle";

// Define type for MapBounds props
interface MapBoundsProps {
    setMapBounds: (bounds: L.LatLngBounds) => void;
}

const MapBounds = ({setMapBounds}: MapBoundsProps) => {
    const map = useMap();

    const func = throttle(() => {
        const bounds: any = map?.getBounds();
        if (bounds && bounds._northEast) {
            setMapBounds(bounds);
        }
    }, 400);

    React.useEffect(() => {
        map.on('moveend', func);
        return () => {
            map.off('moveend', func);
        };
    }, []);

    return <></>;
};

export default MapBounds;
