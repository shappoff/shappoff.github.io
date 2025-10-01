import React from "react";
import HistoricalMap from "@/components/shared/HistoricalMap";

const attribution = "Усай, имение, 1640 г.";
const tileUrl = "https://raw.githubusercontent.com/shappoff/storage/usaya1640/tiles/{z}/{y}/{x}.jpg";

const Usaya1640 = ({children}: any) => (
  <HistoricalMap
    center={[-50, 0]}
    zoom={3}
    minZoom={1}
    maxZoom={6}
    tileUrl={tileUrl}
    attribution={attribution}
    id="map"
    zoomControl={true}
    whenReady={() => {
      setTimeout(() => {
        document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = `<div>${attribution}</div>`;
      }, 100);
    }}
  >{children}</HistoricalMap>
);

export default Usaya1640;
