'use client'

import React from "react";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    LayerGroup,
} from "react-leaflet";

const Bocheikovo1943 = () => {

    return <MapContainer
        id="map"
        center={[-50, 0]}
        zoom={3}
        zoomControl={true}
        style={{height: '99vh'}}
        whenReady={() => {
            setTimeout(() => {
                document!.querySelector('.leaflet-control-attribution.leaflet-control')!
                    .innerHTML = '<div>Бочейково 4 августа 1943 г., Аэрофотосъемка, NCAP TUGX/0500</div>';
            }, 100);
        }}
    >
        <TileLayer
            attribution="Бочейково 4 августа 1943 г., Бешенковичский район, Витебская область. Аэрофотосъемка, NCAP TUGX/0500"
            url={`https://raw.githubusercontent.com/shappoff/storage/bocheikovo1943/tiles/{z}/{y}/{x}.jpg`}
            maxZoom={4}
            minZoom={2}
            noWrap={true}
        />
    </MapContainer>;
};

export default Bocheikovo1943;
