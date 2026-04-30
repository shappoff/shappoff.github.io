"use client";

import { memo } from "react";
import { TileLayer } from "react-leaflet";

import { TILE_LAYER_NO_WRAP } from "./HistoricalMap.constants";
import { HistoricalMapTileLayerProps } from "./HistoricalMap.types";

const HistoricalMapTileLayer = ({
  attribution,
  tileUrl,
  minZoom,
  maxZoom,
}: HistoricalMapTileLayerProps) => (
  <TileLayer
    attribution={attribution}
    url={tileUrl}
    minZoom={minZoom}
    maxZoom={maxZoom}
    noWrap={TILE_LAYER_NO_WRAP}
  />
);

export default memo(HistoricalMapTileLayer);
