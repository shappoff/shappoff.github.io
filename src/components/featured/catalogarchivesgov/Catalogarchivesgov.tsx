'use client'

import React from "react";

import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/styles';

import HistoricalMap from "@/components/shared/HistoricalMap";
import Spinner from "@/components/shared/Spinner";
import dynamic from 'next/dynamic';

const MarkersItemsList = dynamic(() => import('@/components/featured/catalogarchivesgov/MarkersItemsList'), {
    loading: () => <Spinner />, ssr: false
});

const attribution = '<div>Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта <a target="_blank" href="https://catalog.archives.gov/">catalog.archives.gov</a>.</div>';

export default function Catalogarchivesgov({items}: any) {
    return <HistoricalMap
        minZoom={4}
        maxZoom={20}
        center={[53.902287, 27.561824]}
        zoom={7}
        tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style={{position: 'relative', height: '100vh'}}
        id="map"
        zoomControl={false}
        whenReady={() => {
            setTimeout(() => {
                document!.querySelector('.leaflet-control-attribution.leaflet-control')!.innerHTML = attribution;
            }, 100);
        }}
        attribution={attribution}>
        <MarkerClusterGroup>
            <MarkersItemsList items={items} />
        </MarkerClusterGroup>
    </HistoricalMap>
}
