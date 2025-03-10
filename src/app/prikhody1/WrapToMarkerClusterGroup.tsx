'use client'

import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "@/app/prikhody1/MarkersList";
import useMarkersBounds from "@/components/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/prikhody/BoundsToMapItems";

function WrapToMarkerClusterGroup({items, enable = true}: any) {
    const markersBounds = useMarkersBounds(items);
    return <>
        {
            items.length === 1 ? <></> : <BoundsToMapItems
                bounds={markersBounds}
                callback={() => {}}
            />
        }
        {
            enable ?
                <MarkerClusterGroup key="MarkerClusterGroup">
                    <Markers items={items} />
                </MarkerClusterGroup>
                :
                <Markers items={items} />
        }
    </>

}

export default WrapToMarkerClusterGroup;
