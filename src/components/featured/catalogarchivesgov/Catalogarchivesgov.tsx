'use client'

import React from "react";

const MarkerClusterGroup = React.lazy(() => import('react-leaflet-markercluster'));
import 'react-leaflet-markercluster/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import HistoricalMap from "@/components/shared/HistoricalMap";

const attribution = '<div>Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта <a target="_blank" href="https://catalog.archives.gov/">catalog.archives.gov</a>.</div>';

export default function Catalogarchivesgov({children}: any) {
    return <>
        <HistoricalMap
            minZoom={4}
            maxZoom={20}
            center={[53.902287, 27.561824]}
            zoom={7}
            tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attributionControl={false}
            style={{position: 'relative', height: '100vh'}}
            id="map"
            zoomControl={false}
            whenReady={() => {
                setTimeout(() => {
                    document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = attribution;
                }, 100);
            }}
            attribution="">
            <React.Suspense fallback={<Box sx={{ display: 'flex' }}><CircularProgress /></Box>}>
                <MarkerClusterGroup>
                    {children}
                </MarkerClusterGroup>
            </React.Suspense>

        </HistoricalMap>
    </>
}
