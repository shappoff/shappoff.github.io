'use client'

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './prikhody.css';


import {
    MapContainer, Marker, Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles'
import MarkerClusterGroup from 'react-leaflet-markercluster';

import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
    process.env.NEXT_PUBLIC_PRIKHODY_APPLICATIONID || '',
    process.env.NEXT_PUBLIC_PRIKHODY_SEARCHONLYAPIKEY || ''
);

import {useWindowSize} from "@/components/prikhody/useWindowSize";
import LayersControlComponent from "@/components/prikhody/LayersControlComponent";
import PrikhodPlaceMarker from "@/components/prikhody/PrikhodPlaceMarker";
import SetMapSizeOnChange from "@/components/prikhody/SetMapSizeOnChange";
import NPPlaceMarker from "@/components/prikhody/NPPlaceMarker";
import IndicateButton from "@/components/prikhody/IndicateButton";

const PrikhodyMapApp = ({items}: any) => {
    const filterBarRef = React.useRef(null);
    const resultListRef = React.useRef(null);

    const size = useWindowSize();

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

    return <MapContainer
        attributionControl={false}
        id="map"
        key="map"
        center={[53.902287, 27.561824]}
        zoom={7}

        trackResize={true}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{position: 'relative'}}
    >
        <SetMapSizeOnChange key="SetMapSizeOnChange" top={`${filterBarHeight}px`} height={`calc(100vh - ${footerHeight + filterBarHeight}px)`}/>
        <LayersControlComponent key="LayersControlComponent" rootWith={rootWith}/>
        <MarkerClusterGroup key="MarkerClusterGroup">
            {
                items.map((hit: any, indexMarker: number) => {
                    return hit._geoloc?.lat ? <PrikhodPlaceMarker
                        // popupclose={popupclose}
                        // popupopen={popupopen}
                        key={hit.objectID}
                        hit={hit}
                        isMobile={rootWith < 800}
                        // setCurrentLocIdInPopUp={setCurrentLocIdInPopUp}
                        // selectCallback={selectCallback}
                    >
{/*
                        <IndicateButton item={hit} setIsShowPanel={setIsShowPanel} label="Сменить местоположение" />
                        {
                            !!currentNotFoundPrikhodNPs?.length ? <div id="info-panel-label-button" onClick={() => setIsShowNotFoundPanel(true)}>
                                <Badge bg="warning" text="dark">
                                    Не найденные на карте<br/>населенные пункты прихода
                                </Badge>
                            </div> : <></>
                        }
*/}
                    </PrikhodPlaceMarker> : <></>
                })
            }
        </MarkerClusterGroup>
    </MapContainer>;
};

export default PrikhodyMapApp;

