'use client';

import PlaceMarker from '@/components/featured/catalogarchivesgov/PlaceMarker';

import { MarkerItem } from './types';

interface MarkersLayerProps {
    items: MarkerItem[];
}

const getMarkerKey = (item: MarkerItem, index: number) => {
    if (item.naId !== undefined && item.naId !== null) {
        return `${item.naId}-${index}`;
    }

    return `marker-${index}`;
};

const MarkersLayer = ({ items }: MarkersLayerProps) => {
    return (
        <>
            {items.map((item, index) => (
                <PlaceMarker
                    key={getMarkerKey(item, index)}
                    hit={item}
                />
            ))}
        </>
    );
};

export default MarkersLayer;
