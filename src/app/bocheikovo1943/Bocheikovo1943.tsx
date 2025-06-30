import React from "react";
import HistoricalMap from "@/components/HistoricalMap";

const attribution = "Бочейково 4 августа 1943 г., Бешенковичский район, Витебская область. Аэрофотосъёмка, NCAP TUGX/0500";
const tileUrl = "https://raw.githubusercontent.com/shappoff/storage/bocheikovo1943/tiles/{z}/{y}/{x}.jpg";

const Bocheikovo1943 = ({children}: any) => (
  <HistoricalMap
    center={[-50, 0]}
    zoom={3}
    minZoom={2}
    maxZoom={4}
    tileUrl={tileUrl}
    attribution={attribution}
    id="map"
    zoomControl={true}
    whenReady={() => {
      setTimeout(() => {
        document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = '<div>Бочейково 4 августа 1943 г., Аэрофотосъёмка, NCAP TUGX/0500</div>';
      }, 100);
    }}
  >{children}</HistoricalMap>
);

export default Bocheikovo1943;
