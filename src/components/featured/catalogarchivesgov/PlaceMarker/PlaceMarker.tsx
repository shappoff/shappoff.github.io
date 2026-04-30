'use client';

import {Marker} from 'react-leaflet';

import {PLACE_MARKER_ICON} from './constants';
import PlaceMarkerPopup from './PlaceMarkerPopup';
import {PlaceMarkerProps} from './types';

const PlaceMarker = ({hit}: PlaceMarkerProps) => {
    const lat = hit._geoloc?.lat;
    const lng = hit._geoloc?.lng;

    if (!lat || !lng) {
        return null;
    }

    return (
        <Marker
            title={hit.title2}
            icon={PLACE_MARKER_ICON}
            position={[lat, lng]}
        >
            <PlaceMarkerPopup hit={hit} />
        </Marker>
    );
};

export default PlaceMarker;
