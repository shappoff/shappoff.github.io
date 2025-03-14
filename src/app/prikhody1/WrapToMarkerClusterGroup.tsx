'use client'

import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "@/app/prikhody1/MarkersList";
import useMarkersBounds from "@/components/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/prikhody/BoundsToMapItems";

function WrapToMarkerClusterGroup({items, enable = true, bounds = false}: any) {
    const markersBounds = useMarkersBounds(items);
    return <>
        {
            bounds ? <BoundsToMapItems
                key="BoundsToMapItems"
                bounds={markersBounds}
                callback={() => {}}
            /> : <></>
        }
        {
            enable ?
                <MarkerClusterGroup key="MarkerClusterGroup">
                    <Markers key="Markers-2" items={items} />
                </MarkerClusterGroup>
                :
                <Markers key="Markers-1" items={items} />
        }
    </>

}

export default WrapToMarkerClusterGroup;
