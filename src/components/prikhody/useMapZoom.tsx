import React from "react";
import { useMap } from "react-leaflet";
import {throttle} from "./throttle";

const MapZoom = ({setMapZoom}: any) => {
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