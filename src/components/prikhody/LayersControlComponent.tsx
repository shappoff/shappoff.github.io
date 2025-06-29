import {LayerGroup, LayersControl, TileLayer} from "react-leaflet";
import React from "react";

const LayersControlComponent = ({rootWith, maps}: any) => {
    return <>
        <LayersControl collapsed={rootWith < 600}>
            <LayersControl.BaseLayer checked={true} name="OSM">
                <TileLayer
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="ПГМ">
                <TileLayer
                    url={`https://raw.githubusercontent.com/indexby/storage/pgm_vekzhg/tiles/Z{z}/{y}/{x}.jpg`}
                    maxZoom={14}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="3-верстка (1)">
                <TileLayer
                    url={`https://raw.githubusercontent.com/indexby/storage/3v_jun20/tiles/Z{z}/{y}/{x}.jpg`}
                    maxZoom={13}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="3-верстка (2)">
                <TileLayer
                    url={`https://raw.githubusercontent.com/indexby/storage/3v_jan20/tiles/Z{z}/{y}/{x}.jpg`}
                    maxZoom={13}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="РККА">
                <TileLayer
                    url={`https://raw.githubusercontent.com/indexby/storage/rkka_v4/tiles/Z{z}/{y}/{x}.jpg`}
                    maxZoom={14}
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
    </>
};

export default LayersControlComponent;
