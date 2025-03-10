'use client'

import PrikhodPlaceMarker from "@/app/prikhody1/PrikhodPlaceMarker";
import Link from "next/link";

const Markers = ({items}: any) => {
    return items.map((hit: any, indexMarker: number) => {
        const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
        return lat && lng ? <PrikhodPlaceMarker
            // popupclose={popupclose}
            // popupopen={popupopen}
            key={objectID + indexMarker}
            hit={hit}
            isMobile={true}
            // setCurrentLocIdInPopUp={setCurrentLocIdInPopUp}
            // selectCallback={selectCallback}
        >
            <Link href={`/prikhody1/prkhd/${objectID}`}>Подробнее</Link>
        </PrikhodPlaceMarker> : <></>
    })
};

export default Markers;
