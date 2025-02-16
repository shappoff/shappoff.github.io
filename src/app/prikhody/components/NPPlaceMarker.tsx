import L from 'leaflet';
const {
    DivIcon
} = L;
import {Marker, Popup, Tooltip} from "react-leaflet";
import React from "react";
import {catholicCrossIcon, dot, ortodoxCrossIcon, square, triangle} from "./icons";

const NPPlaceMarker = ({hit, color}: any) => {
    let icon = dot(color);
    if (~hit.title.indexOf('деревня')) {
        icon = triangle(color);
    } else if (~hit.title.indexOf('село')) {
        icon = square(color);
    }
    const title = hit.title?.replace('<strong>', '').replace('</strong>', '').trim();
    return <Marker
                   icon={new DivIcon({
                       html: icon,
                       className: `marker-div-icon`
                   })}
                   position={hit.coords}>
                <Tooltip
                    offset={[0, 12]}
                    opacity={1}
            direction="left"><span style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{title}</span></Tooltip>
{/*
        <Popup autoClose={true} closeButton={true}>
            <b style={{textTransform: 'capitalize'}}>{title}</b>
            <div>
                {
                    Object.keys(hit.atd)
                        .map((year: string) => {
                            return <div>
                                <span>{year}: </span>
                                {
                                    hit.atd[year].join(', ')
                                }
                            </div>
                        })
                }
            </div>
        </Popup>
*/}
    </Marker>
};

export default NPPlaceMarker;