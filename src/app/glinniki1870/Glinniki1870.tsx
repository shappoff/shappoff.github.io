import React from "react";
import HistoricalMap from "@/components/HistoricalMap";

const attribution = "Деревня Глинники 1870 г., Генеральное межевание, НИАБ-2192-1-55";
const tileUrl = "https://raw.githubusercontent.com/shappoff/storage/glinniki1870/tiles/{z}/{y}/{x}.jpg";

const Glinniki1870 = ({children}: any) => (
  <HistoricalMap
    center={[0, 0]}
    zoom={2}
    minZoom={2}
    maxZoom={6}
    tileUrl={tileUrl}
    attribution={attribution}
    id="map"
    zoomControl={true}
    whenReady={() => {
      setTimeout(() => {
        document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = '<div>Деревня Глинники. Генеральное межевание, НИАБ-2192-1-55</div>';
      }, 100);
    }}
  >{children}</HistoricalMap>
);

export default Glinniki1870;
