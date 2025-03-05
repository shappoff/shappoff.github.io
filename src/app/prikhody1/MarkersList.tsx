'use client'

import PrikhodPlaceMarker from "@/app/prikhody1/PrikhodPlaceMarker";

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
        ></PrikhodPlaceMarker> : <></>
    })
};

export default Markers;
