'use client'

import React from "react";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
const {DivIcon} = L;
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    LayerGroup,
} from "react-leaflet";

import {items} from "./items";

const Glinniki1846 = () => {

    return <MapContainer
        attributionControl={false}
        id="map"
        key="map"
        center={[-70.00462189463703,-33.68408203125001]}
        zoom={11}
        trackResize={true}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{height: '99vh'}}
    >
        <LayerGroup>
            <TileLayer
                attribution="Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния"
                url={`https://raw.githubusercontent.com/shappoff/storage/glinninki1846/tiles/{z}/{y}/{x}.jpg`}
                maxZoom={6}
                minZoom={2}
                noWrap={true}
            />
        </LayerGroup>
        {
            [
                {title: 'Залазье', _geoloc: [-69.59446755804224,-30.717773437500004]},
                {title: 'Зяблица', _geoloc: [-43.356933632877706,22.3681640625]},
                {title: 'Авхуты', _geoloc: [30.37555657186203,74.53125000000001]},
                {title: 'Курчи', _geoloc: [7.801537909899604,35.33203125000001]},
                {title: 'Глинники', _geoloc: [65.7497493092695,119.48730468750001]},
            ].map((item: any) => {
                return <Marker title={item.title}
                               icon={new DivIcon({
                                   html: `<b>${item.title}</b>`,
                                   className: 'marker-div-icon'
                               })}
                               position={item._geoloc}>
                </Marker>
            })
        }
        {
            items.map((hit: any) => {
                return <Marker title={hit.info || hit.title}
                               icon={new DivIcon({
                                   html: `<b>${hit.title}</b>`,
                                   className: 'marker-div-icon'
                               })}
                               position={hit._geoloc}>
                    <Popup>
                        <header>
                            <h4>{hit.title}</h4>
                        </header>
                        <div className="marker-info">{hit.info ? hit.info : 'не найдено иноформации'}{hit.value ? `: ${hit.value} дес.` : ''}</div>
                        <br/>
                        <footer>
                            <div>
                                {
                                    hit.place
                                        ? <span><i>приписано к деревне</i> <u className="village-title">{hit.place}</u></span>
                                        : ''
                                }
                            </div>
                        </footer>
                    </Popup>
                </Marker>
            })
        }
    </MapContainer>;
};

export default Glinniki1846;
