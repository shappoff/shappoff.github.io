import {useMap} from "react-leaflet";
import React from "react";
import {LayersControlEvent, LayersControlEventHandlerFn} from "leaflet";

const BoundsToMapItems = ({bounds, callback}: any) => {
    const map = useMap();

    React.useEffect(() => {
        const ms = setTimeout(() => {
            // bounds && map.fitBounds(bounds);
        }, 100);
        return ()  => {
            ms && clearTimeout(ms);
        };
    }, [bounds]);

    const baselayerchangeHandler: LayersControlEventHandlerFn = (e: LayersControlEvent | any) => {
        callback && callback(e, map);
    }

    React.useEffect(() => {
        map.on("zoomend", baselayerchangeHandler);

        return () => {
            map.off("zoomend", baselayerchangeHandler);
        }
    }, []);

    return <></>
};

export default BoundsToMapItems;