import React from "react";
import HistoricalMap from "@/components/HistoricalMap";

const attribution = "Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния";
const tileUrl = "https://raw.githubusercontent.com/shappoff/storage/glinninki1846/tiles/{z}/{y}/{x}.jpg";

const Glinniki1846 = ({children}: any) => (
  <HistoricalMap
    center={[-70.00462189463703, -33.68408203125001]}
    zoom={11}
    minZoom={2}
    maxZoom={6}
    tileUrl={tileUrl}
    attribution={attribution}
    id="map"
    zoomControl={false}
    whenReady={() => {
      setTimeout(() => {
        document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = '<div>Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния</div>';
      }, 100);
    }}
  >{children}</HistoricalMap>
);

export default Glinniki1846;
