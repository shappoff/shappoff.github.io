"use client";

import { MapContainer } from "react-leaflet";

import {
  DEFAULT_MAP_ID,
  DEFAULT_MAP_STYLE,
  DEFAULT_MAX_ZOOM,
  DEFAULT_MIN_ZOOM,
  DEFAULT_ZOOM_CONTROL,
} from "./HistoricalMap.constants";
import HistoricalMapTileLayer from "./HistoricalMapTileLayer";
import { HistoricalMapProps } from "./HistoricalMap.types";
import "leaflet/dist/leaflet.css";

const HistoricalMap = ({
  center,
  zoom,
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
  tileUrl,
  attribution,
  style = DEFAULT_MAP_STYLE,
  id = DEFAULT_MAP_ID,
  zoomControl = DEFAULT_ZOOM_CONTROL,
  whenReady,
  children,
}: HistoricalMapProps) => (
  <MapContainer
    id={id}
    center={center}
    zoom={zoom}
    minZoom={minZoom}
    maxZoom={maxZoom}
    zoomControl={zoomControl}
    style={style}
    whenReady={whenReady}
  >
    <HistoricalMapTileLayer
      attribution={attribution}
      tileUrl={tileUrl}
      minZoom={minZoom}
      maxZoom={maxZoom}
    />
    {children}
  </MapContainer>
);

export default HistoricalMap;
