import L from 'leaflet';
const {
    DivIcon
} = L;
import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

import {Marker, Popup, Tooltip} from "react-leaflet";
import {catholicCrossIcon, ortodoxCrossIcon} from "@/components/icons";
import Link from "next/link";

const PrikhodPlaceMarker = ({hit, popupclose, popupopen, setCurrentLocIdInPopUp, selectCallback, children}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
    const atdList = atd?.split('|');
    const isOrtodox = !!~title.indexOf('церковь');
    return <Marker title={`${pType ? `${pType} ` : ''}${pTitle}, ${title}`}
                   eventHandlers={{
                       popupclose: (e: any) => {},
                       mouseover: (e: any) => {},
                       popupopen: (e: any) => {},
                   }}
                   icon={new DivIcon({
                       html: isOrtodox ? ortodoxCrossIcon : catholicCrossIcon,
                       className: `marker-church-div-icon ${isOrtodox ? 'orthodox' : 'сatholic'} ${+src === 0 ? 'no-metrics' : ''}`
                   })}
                   position={[parseFloat(lat.replace(',', '.')), parseFloat(lng.replace(',', '.'))]}>
        <Popup key="Popup">
            <b style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{pType ? `${pType} ` : ''}{pTitle}</b>
            <h6 style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{title}</h6>
            {children}
            <footer style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    atdList?.map((atdItem: string, atdIndex: number) => {
                        const urlPath = cyrillicToTranslit.transform(atdItem.trim(), '_').toLowerCase()
                        return <div key={atdIndex} style={{whiteSpace: 'nowrap'}}><Link href={`/prikhody1/atd/${urlPath}`}><small>{atdItem}</small></Link></div>
                    })
                }
            </footer>
        </Popup>
    </Marker>
};

export default PrikhodPlaceMarker;
