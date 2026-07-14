'use client';

import MarkersBoundsLayer from './MarkersBoundsLayer';
import MarkersLayer from './MarkersLayer';
import { MarkersItemsListProps } from './types';

const MarkersItemsList = ({ items = [], dataset }: MarkersItemsListProps) => {
    if (!items.length) {
        return null;
    }

    return (
        <>
            <MarkersBoundsLayer items={items} />
            <MarkersLayer items={items} dataset={dataset} />
        </>
    );
};

export default MarkersItemsList;
