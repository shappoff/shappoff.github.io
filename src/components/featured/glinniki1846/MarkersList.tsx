"use client"

import { useMemo } from 'react';
import "leaflet/dist/leaflet.css";
import {
    Marker,
    Popup,
} from "react-leaflet";
import type { LatLngTuple } from 'leaflet';

import { createCachedDivIcon } from '@/components/shared/leaflet/createCachedDivIcon';
import {items} from "@/components/featured/glinniki1846/items";

const getLabelIcon = (label: string) =>
    createCachedDivIcon(`label-${label}`, {
        html: `<b>${label}</b>`,
        className: 'marker-div-icon',
    });

const villageMarkers: { title: string; _geoloc: LatLngTuple }[] = [
    {title: 'Залазье', _geoloc: [-69.59446755804224,-30.717773437500004]},
    {title: 'Зяблица', _geoloc: [-43.356933632877706,22.3681640625]},
    {title: 'Авхуты', _geoloc: [30.37555657186203,74.53125000000001]},
    {title: 'Курчи', _geoloc: [7.801537909899604,35.33203125000001]},
    {title: 'Глинники', _geoloc: [65.7497493092695,119.48730468750001]},
];

const MarkersList = () => {
    const parcelMarkers = useMemo(
        () =>
            items.map((hit: any) => ({
                ...hit,
                icon: getLabelIcon(hit.title),
            })),
        [],
    );

    return (
        <>
            {villageMarkers.map((item) => (
                <Marker
                    key={item.title}
                    title={item.title}
                    icon={getLabelIcon(item.title)}
                    position={item._geoloc}
                />
            ))}
            {parcelMarkers.map((hit: any) => (
                <Marker
                    key={hit.title}
                    title={hit.info || hit.title}
                    icon={hit.icon}
                    position={hit._geoloc}
                >
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
            ))}
        </>
    );
};

export default MarkersList;
