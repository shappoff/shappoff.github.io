'use client'

import React from "react";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    LayerGroup,
} from "react-leaflet";

const Zalazje1943 = () => {

    return <MapContainer
        id="map"
        center={[-50, 0]}
        zoom={3}
        zoomControl={true}
        style={{height: '99vh'}}
        whenReady={() => {
            setTimeout(() => {
                document!.querySelector('.leaflet-control-attribution.leaflet-control')!
                    .innerHTML = '<div>Деревня Залазье 14 октября 1943 г., Аэрофотосъемка, NCAP TUGX/0508</div>';
            }, 100);
        }}
    >
        <TileLayer
            attribution="Деревня Залазье 14 октября 1943 г., Аэрофотосъемка, NCAP TUGX/0508"
            url={`https://raw.githubusercontent.com/shappoff/storage/zalazje1943/tiles/{z}/{y}/{x}.jpg`}
            maxZoom={6}
            minZoom={2}
            noWrap={true}
        />
    </MapContainer>;
};

export default Zalazje1943;
