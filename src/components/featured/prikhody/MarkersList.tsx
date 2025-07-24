'use client'

import PrikhodPlaceMarker from "@/components/featured/prikhody/PrikhodPlaceMarker";
import Link from "next/link";

const Markers = ({items, markerLabel}: any) => {
    const isDev = !!~location.search.indexOf('debug');
    return items.map((hit: any, indexMarker: number) => {
        const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
        return lat && lng ? <PrikhodPlaceMarker
            key={objectID}
            hit={hit}
            isMobile={true}
            isDev={isDev}
            markerLabel={markerLabel}
        >
            <div>
                <Link href={`/prikhody/p/${objectID}`}><big>Подробнее</big></Link>
            </div>
        </PrikhodPlaceMarker> : <></>
    })
};

export default Markers;
