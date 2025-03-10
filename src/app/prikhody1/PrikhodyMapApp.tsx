'use client'

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './prikhody.css';


import {MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import {useWindowSize} from "@/components/prikhody/useWindowSize";
import LayersControlComponent from "@/components/prikhody/LayersControlComponent";
import SetMapSizeOnChange from "@/components/prikhody/SetMapSizeOnChange";
import FilterBar from "@/components/prikhody/FilterBar";
import Select from "react-select";

const PrikhodyMapApp = ({children, items}: any) => {
    const filterBarRef = React.useRef(null);
    const resultListRef = React.useRef(null);
    const pathname = usePathname();

    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isTypoTolerance, setIsTypoTolerance] = React.useState<boolean>(true);
    const [uOptions, setuOptions] = React.useState<any>([]);

    const size = useWindowSize();
    const router = useRouter();

    const [rootWith, setRootWith] = React.useState(0);
    const [filterBarHeight, setFilterBarHeight] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(0);

    React.useEffect(() => {
        const resultList: any = resultListRef ? resultListRef.current : null;
        const filterBar: any = filterBarRef ? filterBarRef.current : null;
        const root = document.querySelector('body');
        if (filterBar) {
            setFilterBarHeight(filterBar.clientHeight);
        }
        if (resultList) {
            setFooterHeight(resultList.clientHeight);
        }
        if (root) {
            setRootWith(root.clientWidth);
        }
    }, [size]);

    React.useEffect(() => {
        const atdObj: any = {};
        items.forEach(([,,,,,,,atdStr]: any) => {
            if (atdStr) {
                const atdList = atdStr.split('|');
                atdList.forEach((atd: string) => {
                    const converted = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
                    if (!atdObj[converted]) {
                        atdObj[converted] = atd.trim();
                    }
                });
            }
        });
        const optionsItmes = Object.keys(atdObj).map((hit: any) => {
            return ({
                label: atdObj[hit],
                value: hit
            })
        });

        setuOptions(optionsItmes.sort((a: any, b: any) => a.label.localeCompare(b.label)));
    }, [items]);

    const searchHandler = ({target}: any) => {
        setSearchTerm(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
        }
    };

    return ~pathname.indexOf('atd') ? children : <>
        <div key="filter-bar" id="filter-bar" ref={filterBarRef}>
            <FilterBar
                {
                    ...{
                        searchHandler,
                        keysHandler,
                        searchTerm,
                        isTypoTolerance, setIsTypoTolerance,
                    }
                }
            >
                <Select className="select-filter white-space-nowrap"
                        isClearable={true}
                        isLoading={false}
                        options={uOptions}
                        value={uOptions.find((v: any) => ~location.href.indexOf(v.value))}
                        placeholder={'Уезд/Район'}
                        onChange={(e: any) => {
                            router.push(`/prikhody1/${e.value}`)
                        }}
                />
            </FilterBar>
        </div>
        <MapContainer
            attributionControl={false}
            id="map"
            key="map1"
            center={[53.902287, 27.561824]}
            zoom={7}

            trackResize={true}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{position: 'relative'}}
        >
            <SetMapSizeOnChange key="SetMapSizeOnChange" top={`${filterBarHeight}px`}
                                height={`calc(100vh - ${footerHeight + filterBarHeight}px)`}/>
            <LayersControlComponent key="LayersControlComponent" rootWith={rootWith}/>
            {children}
        </MapContainer>
    </>;
};

export default PrikhodyMapApp;

