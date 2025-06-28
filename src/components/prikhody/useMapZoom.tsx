import React from "react";
import { useMap } from "react-leaflet";
import { MapZoomProps } from '../../shared/types';

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
