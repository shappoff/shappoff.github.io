'use client'

import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "@/app/prikhody1/MarkersList";

function WrapToMarkerClusterGroup({items, enable = true}: any) {
    return <>
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
