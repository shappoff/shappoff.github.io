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
        attributionControl={false}
        id="map"
        key="map"
        center={[0, 0]}
        zoom={2}
        trackResize={true}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{height: '99vh'}}
    >
        <LayerGroup>
            <TileLayer
                attribution="Дер. Глинники. Генеральное межевание"
                url={`https://raw.githubusercontent.com/shappoff/storage/glinniki1870/tiles/{z}/{y}/{x}.jpg`}
                maxZoom={6}
                minZoom={2}
                noWrap={true}
            />
        </LayerGroup>
    </MapContainer>;
};

export default Glinniki1870;
