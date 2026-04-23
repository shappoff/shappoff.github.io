'use client';

import { useCallback } from 'react';

import BoundsToMapItems from '@/components/featured/prikhody/BoundsToMapItems';
import useMarkersBounds from '@/components/featured/prikhody/useMarkersBounds';

import { MarkerItem } from './types';

interface MarkersBoundsLayerProps {
    items: MarkerItem[];
}

const MarkersBoundsLayer = ({ items }: MarkersBoundsLayerProps) => {
    const markersBounds = useMarkersBounds(items);
    const handleZoomEnd = useCallback(() => {}, []);

    return (
        <BoundsToMapItems
            bounds={markersBounds}
            callback={handleZoomEnd}
        />
    );
};

export default MarkersBoundsLayer;
