import React from "react";
import PlaceMarker from "@/components/featured/catalogarchivesgov/PlaceMarker";

function MarkersItemsList({items}: any) {
    return items.map((hit: any, index: number) => {
        return <PlaceMarker key={index} hit={hit}/>
    })
}

export default MarkersItemsList;
