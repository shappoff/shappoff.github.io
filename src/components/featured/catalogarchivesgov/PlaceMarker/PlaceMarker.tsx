'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { Marker } from 'react-leaflet';
import type { Marker as LeafletMarker } from 'leaflet';

import { CatalogDataset, MarkerIndexItem } from '../types';
import { PLACE_MARKER_ICON } from './constants';
import PlaceMarkerPopup from './PlaceMarkerPopup';

interface PlaceMarkerProps {
    item: MarkerIndexItem;
    dataset: CatalogDataset;
}

const PlaceMarker = ({ item, dataset }: PlaceMarkerProps) => {
    const markerRef = useRef<LeafletMarker>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (isPopupOpen) {
            markerRef.current?.openPopup();
        }
    }, [isPopupOpen]);

    return (
        <Marker
            ref={markerRef}
            title={item.title2}
            icon={PLACE_MARKER_ICON}
            position={[item.lat, item.lng]}
            eventHandlers={{
                click: () => setIsPopupOpen(true),
                popupclose: () => setIsPopupOpen(false),
            }}
        >
            {isPopupOpen && (
                <PlaceMarkerPopup
                    naId={item.naId}
                    dataset={dataset}
                    title2={item.title2}
                />
            )}
        </Marker>
    );
};

export default memo(PlaceMarker);
