'use client';

import { useMemo } from 'react';

import MarkersBoundsLayer from './MarkersBoundsLayer';
import MarkersLayer from './MarkersLayer';
import { MarkerItem, MarkersItemsListProps } from './types';

const MarkersItemsList = ({ items = [] }: MarkersItemsListProps) => {
    const markerItems = useMemo<MarkerItem[]>(() => {
        return Array.isArray(items) ? items : [];
    }, [items]);

    if (!markerItems.length) {
        return null;
    }

    return (
        <>
            <MarkersBoundsLayer items={markerItems} />
            <MarkersLayer items={markerItems} />
        </>
    );
};

export default MarkersItemsList;
