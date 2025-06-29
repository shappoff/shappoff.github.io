import L from 'leaflet';

const {
    DivIcon
} = L;
import {Marker, Popup, useMap} from "react-leaflet";
import React from "react";

const PlaceMarker = ({hit}: any) => {
    const map = useMap();
    const {_geoloc} = hit;

    const {lat, lng} = _geoloc;
    return <Marker
        title={hit.title2}
        icon={new DivIcon({
            html: `
                <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32">
                    <path d="M0 28v-20q0-0.832 0.576-1.408t1.44-0.576h4q0.8 0 1.408-0.576t0.576-1.44 0.576-1.408 1.44-0.576h12q0.8 0 1.408 0.576t0.576 1.408 0.576 1.44 1.44 0.576h4q0.8 0 1.408 0.576t0.576 1.408v20q0 0.832-0.576 1.44t-1.408 0.576h-28q-0.832 0-1.44-0.576t-0.576-1.44zM6.016 16q0 2.048 0.768 3.904t2.144 3.168 3.2 2.144 3.872 0.8q2.72 0 5.024-1.344t3.648-3.648 1.344-5.024-1.344-4.992-3.648-3.648-5.024-1.344q-2.016 0-3.872 0.8t-3.2 2.112-2.144 3.2-0.768 3.872zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256z"></path>
                </svg>            
            `,
            className: 'marker-div-icon'
        })}
        position={[lat, lng]}>
        <Popup closeButton={true} closeOnClick={true} closeOnEscapeKey={true}>
            <div>
                <div><b>{hit.title2}</b></div>
                <div><b>{hit.title}</b></div>
                <div>
                    <a href={`https://catalog.archives.gov/id/${hit.naId}`} target="_blank">https://catalog.archives.gov/id/{hit.naId}</a>
                </div>
                <br />
                {
                    hit.digitalObjects.map((dOb: any, index: number) => {
                        return <div key={index}><a href={dOb.objectUrl} target="_blank">{dOb.objectFilename}</a></div>
                    })
                }
                <br />
                <hr />
                <footer>{hit.productionDates?.map(({day, month, year}: any, index: number) => <div key={index}>{day}.{month}.{year}</div>)}</footer>
            </div>
        </Popup>
    </Marker>
};

export default PlaceMarker;
