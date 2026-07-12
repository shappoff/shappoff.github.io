'use client';

import { useMemo } from 'react';

import { CatalogDataset, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';

import MarkersBoundsLayer from './MarkersBoundsLayer';
import MarkersLayer from './MarkersLayer';
import { MarkersItemsListProps } from './types';

const MarkersItemsList = ({ items = [], dataset }: MarkersItemsListProps) => {
    const markerItems = useMemo<MarkerIndexItem[]>(() => {
        return Array.isArray(items) ? items : [];
    }, [items]);

    if (!markerItems.length) {
        return null;
    }

    return (
        <>
            <MarkersBoundsLayer items={markerItems} />
            <MarkersLayer items={markerItems} dataset={dataset} />
        </>
    );
};

export default MarkersItemsList;
