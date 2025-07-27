import React from "react";
import PlaceMarker from "@/components/featured/catalogarchivesgov/PlaceMarker";
import useMarkersBounds from "@/components/featured/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/featured/prikhody/BoundsToMapItems";

function MarkersItemsList({items}: any) {
    const markersBounds = useMarkersBounds(items);
    return <>
        <BoundsToMapItems
            key="BoundsToMapItems"
            bounds={markersBounds}
            callback={() => {}}
        />
        {
            items.map((hit: any, index: number) => {
                return <PlaceMarker key={`${hit.naId}${index}`} hit={hit}/>
            })
        }
    </>
}

export default MarkersItemsList;
