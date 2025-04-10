'use client'

import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "@/app/prikhody/MarkersList";
import useMarkersBounds from "@/components/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/prikhody/BoundsToMapItems";

function WrapToMarkerClusterGroup({
                                      items,
                                      maxClusterRadius = 150,
                                      enable = true,
                                      bounds = false,
                                      markerLabel
}: any) {
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
                <MarkerClusterGroup
                    key="MarkerClusterGroup"
                    maxClusterRadius={maxClusterRadius}
                >
                    <Markers key="Markers-2" items={items} markerLabel={markerLabel} />
                </MarkerClusterGroup>
                :
                <Markers key="Markers-1" items={items} markerLabel={markerLabel} />
        }
    </>

}

export default WrapToMarkerClusterGroup;
