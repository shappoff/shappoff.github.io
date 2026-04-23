import { CSSProperties, ReactNode } from "react";

export interface HistoricalMapProps {
  center: [number, number];
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  tileUrl: string;
  attribution: string;
  style?: CSSProperties;
  id?: string;
  zoomControl?: boolean;
  whenReady?: () => void;
  children?: ReactNode;
}

export interface HistoricalMapTileLayerProps {
  attribution: string;
  tileUrl: string;
  minZoom: number;
  maxZoom: number;
}
