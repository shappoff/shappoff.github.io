'use client'

import {
    LayersControl,
    MapContainer, TileLayer
} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';

import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles'

import PlaceMarker from "@/components/catalogarchivesgov/PlaceMarker";
import React from "react";

export default function Catalogarchivesgov({items}: any) {
    const list = items
        .filter((item: any) =>
            item.scopeAndContentNote &&
            ~item.scopeAndContentNote?.indexOf(',') &&
            !~item.scopeAndContentNote?.indexOf('Latitude:') &&
            ~item.scopeAndContentNote?.indexOf('-'))
        .map((item: any) => {
            const [coords, title2] = item.scopeAndContentNote.split('-');
            const [lat, lng] = coords.trim().split(',');
            if (!(lat && lng)) {
                return null
            }
            const _geoloc = {lat: lat.trim(), lng: lng.trim()};
            return {...item, _geoloc, title2}
        })
    return <>
        <MapContainer
            attributionControl={false}
            id="map"
            center={[53.902287, 27.561824]}
            zoom={7}
            trackResize={true}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{position: 'relative', height: '100vh'}}
        >
            <LayersControl collapsed={false}>
                <LayersControl.BaseLayer checked={true} name="OSM">
                    <TileLayer
                        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google">
                    <TileLayer
                        url={'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'}
                        maxZoom={20}
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <MarkerClusterGroup>
                {
                    list.filter((item: any) => !!item).map((hit: any, index: number) => {
                        return <PlaceMarker key={index} hit={hit}/>
                    })
                }
            </MarkerClusterGroup>
        </MapContainer>
    </>
}
