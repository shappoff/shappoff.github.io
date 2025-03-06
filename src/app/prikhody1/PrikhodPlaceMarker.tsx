import L from 'leaflet';
const {
    DivIcon
} = L;
import {Marker, Popup, Tooltip} from "react-leaflet";
import {catholicCrossIcon, ortodoxCrossIcon} from "@/components/icons";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Link from "next/link";
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

const PrikhodPlaceMarker = ({hit, popupclose, popupopen, setCurrentLocIdInPopUp, selectCallback, children}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
    const linksID = atd?.split('|')
        .map((value: string) => cyrillicToTranslit.transform(value.trim(), '_').toLowerCase())
    const isOrtodox = !!~title.indexOf('церковь');
    return <Marker title={`${pType ? `${pType} ` : ''}${pTitle}, ${title}`}
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
                       className: `marker-church-div-icon ${isOrtodox ? 'orthodox' : 'сatholic'} ${+src === 0 ? 'no-metrics' : ''}`
                   })}
                   position={[parseFloat(lat.replace(',', '.')), parseFloat(lng.replace(',', '.'))]}>
        <Popup key="Popup">
            <b style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{pType ? `${pType} ` : ''}{pTitle}</b>
            <h6 style={{textTransform: 'capitalize'}}>{title}</h6>
            {children}
            {
                linksID?.map((linkId: string) => <p><Link key={linkId} href={`/prikhody1/${linkId}`}>{linkId}</Link></p>)
            }
        </Popup>
    </Marker>
};

export default PrikhodPlaceMarker;
