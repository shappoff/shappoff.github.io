'use client'

import MarkerClusterGroup from "react-leaflet-markercluster";

function WrapToMarkerClusterGroup({children}: any) {
    return <MarkerClusterGroup key="MarkerClusterGroup">
        {children}
    </MarkerClusterGroup>

}

export default WrapToMarkerClusterGroup;
