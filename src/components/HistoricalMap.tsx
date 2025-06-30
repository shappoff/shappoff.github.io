"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface HistoricalMapProps {
  center: [number, number];
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  tileUrl: string;
  attribution: string;
  style?: React.CSSProperties;
  id?: string;
  zoomControl?: boolean;
  whenReady?: () => void;
  children?: React.ReactNode;
}

const HistoricalMap: React.FC<HistoricalMapProps> = ({
  center,
  zoom,
  minZoom = 2,
  maxZoom = 6,
  tileUrl,
  attribution,
  style = { height: "99vh" },
  id = "map",
  zoomControl = true,
  whenReady,
  children,
}) => (
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
    <TileLayer
      attribution={attribution}
      url={tileUrl}
      maxZoom={maxZoom}
      minZoom={minZoom}
      noWrap={true}
    />
    {children}
  </MapContainer>
);

export default HistoricalMap;
