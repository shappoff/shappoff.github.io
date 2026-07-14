'use client';

import BoundsToMapItems from '@/components/featured/prikhody/BoundsToMapItems';
import useMarkersBounds from '@/components/featured/prikhody/useMarkersBounds';
import { MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';

interface MarkersBoundsLayerProps {
    items: MarkerIndexItem[];
}

const MarkersBoundsLayer = ({ items }: MarkersBoundsLayerProps) => {
    const markersBounds = useMarkersBounds(items);

    return <BoundsToMapItems bounds={markersBounds} />;
};

export default MarkersBoundsLayer;
