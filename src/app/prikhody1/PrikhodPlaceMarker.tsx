import L from 'leaflet';
const {
    DivIcon
} = L;
import {Marker, Popup, Tooltip} from "react-leaflet";
import {catholicCrossIcon, ortodoxCrossIcon} from "@/components/icons";

const PrikhodPlaceMarker = ({hit, popupclose, popupopen, setCurrentLocIdInPopUp, selectCallback, children}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
    const atdList = atd?.split('|');
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
            <h6 style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{title}</h6>
            {children}
            <footer style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    atdList?.map((atdItem: string) => <div style={{whiteSpace: 'nowrap'}}><small>{atdItem}</small></div>)
                }
            </footer>
        </Popup>
    </Marker>
};

export default PrikhodPlaceMarker;
