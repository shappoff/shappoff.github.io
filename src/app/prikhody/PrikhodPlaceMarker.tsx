import L from 'leaflet';
const {
    DivIcon
} = L;
import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

import {Marker, Popup, Tooltip} from "react-leaflet";
import {catholicCrossIcon, ortodoxCrossIcon} from "@/components/icons";
import { renderToStaticMarkup } from "react-dom/server";
import Link from "next/link";
import Image from 'next/image';

const PrikhodPlaceMarker = ({hit, isDev, popupopen, setCurrentLocIdInPopUp, selectCallback, children}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
    const [prtitle, type] = objectID.split('_');
    const redLink = `https://radzima.net/ru/${type}/${prtitle}.html`;
    const atdList = atd?.split('|');
    const isOrtodox = !!~title.indexOf('церковь');
    return <Marker title={`${pType ? `${pType} ` : ''}${pTitle}, ${title}`}
                   eventHandlers={{
                       popupclose: (e: any) => {},
                       mouseover: (e: any) => {},
                       popupopen: (e: any) => {},
                   }}
                   icon={new DivIcon({
                       html: isDev ? renderToStaticMarkup(
                           <div className="badge-wrapper"
                                  style={{
                                      fontSize: '10px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      color: +src === 0 ? 'black' : isOrtodox ? 'red' : 'blue'
                                  }}
                           >
                               <span dangerouslySetInnerHTML={{__html: isOrtodox ? ortodoxCrossIcon : catholicCrossIcon}} />
                               <span>{src}</span>
                           </div>
                       ) : isOrtodox ? ortodoxCrossIcon : catholicCrossIcon,
                       className: `marker-church-div-icon ${isOrtodox ? 'orthodox' : 'сatholic'} ${+src === 0 ? 'no-metrics' : ''}`
                   })}
                   position={[parseFloat(lat.replace(',', '.')), parseFloat(lng.replace(',', '.'))]}>
        <Popup key="Popup">
            <b style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{pType ? `${pType} ` : ''}{pTitle}</b>
            <h6 style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{title}</h6>
            {children}
            <footer style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    isDev ? atdList?.map((atdItem: string, atdIndex: number) => {
                        const urlPath = cyrillicToTranslit.transform(atdItem.trim(), '_').toLowerCase()
                        return <div key={atdIndex} style={{whiteSpace: 'nowrap'}}><Link href={`/prikhody/atd/${urlPath}`}><small>{atdItem}</small></Link></div>
                    }) : <></>
                }

            </footer>
            {isDev ? <a target="_blank" href={redLink}>
                <Image src="https://radzima.net/favicon.ico" alt={title} width={10} height={10} />
                &nbsp;
                <small>radzima.net</small>
            </a> : <></>}
        </Popup>
    </Marker>
};

export default PrikhodPlaceMarker;
