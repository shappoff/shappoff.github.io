import L from 'leaflet';
const {
    DivIcon
} = L;
import {Marker, Popup, Tooltip} from "react-leaflet";
import React from "react";
import {catholicCrossIcon, ortodoxCrossIcon} from "./icons";

const PrikhodPlaceMarker = ({hit, popupclose, popupopen, setCurrentLocIdInPopUp, selectCallback, children}: any) => {

    const isOrtodox = !!~hit.title.indexOf('церковь');
    return <Marker title={`${hit.pType ? `${hit.pType} ` : ''}${hit.pTitle}, ${hit.title}`}
                   eventHandlers={{
                       popupclose: (e: any) => popupclose && popupclose(e),
                       mouseover: (e: any) => {
                           setCurrentLocIdInPopUp && setCurrentLocIdInPopUp(hit);
                       },
                       popupopen: (e: any) => {
                           setCurrentLocIdInPopUp(hit);
                           popupopen && popupopen(e);
                       },
                   }}
                   icon={new DivIcon({
                       html: isOrtodox ? ortodoxCrossIcon : catholicCrossIcon,
                       className: `marker-church-div-icon ${isOrtodox ? 'orthodox' : 'сatholic'} ${hit.src === 0 ? 'no-metrics' : ''}`
                   })}
                   position={[hit._geoloc.lat, hit._geoloc.lng]}>
        <Popup>
            <b style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{hit.pType ? `${hit.pType} ` : ''}{hit.pTitle}</b>
            <h6 style={{textTransform: 'capitalize'}}>{hit.title}</h6>
            {children}
            <p>
                <a href="javascript:void(0)" onClick={() => {selectCallback(hit)}}><i>Подробнее</i></a>
            </p>
        </Popup>
    </Marker>
};

export default PrikhodPlaceMarker;
