import React from "react";
import { useMap } from "react-leaflet";
import {throttle} from "./throttle";

// Define type for MapZoom props
interface MapZoomProps {
    setMapZoom: (zoom: number) => void;
}

const MapZoom = ({setMapZoom}: MapZoomProps) => {
    const map = useMap();

    const func = () => {
        const zoom = map?.getZoom();
        if (zoom) {
            setMapZoom(zoom);
        }
    };

    React.useEffect(() => {
        map.on('zoomstart', func);
        return () => {
            map.off('zoomstart', func);
        };
    }, []);

    return <></>;
};

export default MapZoom;