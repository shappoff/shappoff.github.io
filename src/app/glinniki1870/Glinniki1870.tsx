'use client'

import React from "react";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    LayerGroup,
} from "react-leaflet";

const Glinniki1870 = () => {

    return <MapContainer
        id="map"
        center={[0, 0]}
        zoom={2}
        zoomControl={true}
        style={{height: '99vh'}}
        whenReady={() => {
            setTimeout(() => {
                document!.querySelector('.leaflet-control-attribution.leaflet-control')!
                    .innerHTML = '<div>Деревня Глинники. Генеральное межевание, НИАБ-2192-1-55</div>';
            }, 100);
        }}
    >
        <TileLayer
            attribution="Деревня Глинники 1870 г., Генеральное межевание, НИАБ-2192-1-55"
            url={`https://raw.githubusercontent.com/shappoff/storage/glinniki1870/tiles/{z}/{y}/{x}.jpg`}
            maxZoom={6}
            minZoom={2}
            noWrap={true}
        />
    </MapContainer>;
};

export default Glinniki1870;
