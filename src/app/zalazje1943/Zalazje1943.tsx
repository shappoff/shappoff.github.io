"use client";
import React from "react";
import HistoricalMap from "@/components/shared/HistoricalMap";

const attribution = "Деревня Залазье 14 октября 1943 г., Аэрофотосъёмка, NCAP TUGX/0508";
const tileUrl = "https://raw.githubusercontent.com/shappoff/storage/zalazje1943/tiles/{z}/{y}/{x}.jpg";

const Zalazje1943 = ({children}: any) => (
  <HistoricalMap
    center={[-50, 0]}
    zoom={3}
    minZoom={2}
    maxZoom={6}
    tileUrl={tileUrl}
    attribution={attribution}
    id="map"
    zoomControl={true}
    whenReady={() => {
      setTimeout(() => {
        document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = '<div>Деревня Залазье 14 октября 1943 г., Аэрофотосъёмка, NCAP TUGX/0508</div>';
      }, 100);
    }}
  >{children}</HistoricalMap>
);

export default Zalazje1943;
