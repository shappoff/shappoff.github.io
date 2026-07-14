'use client';

import { Popup } from 'react-leaflet';

import { useCatalogMarkerDetails } from '../hooks/useCatalogMarkerDetails';
import { CatalogDataset } from '../types';
import PlaceMarkerPopupContent from './PlaceMarkerPopupContent';

interface PlaceMarkerPopupProps {
    naId: string | number;
    dataset: CatalogDataset;
    title2?: string;
}

const PlaceMarkerPopup = ({ naId, dataset, title2 }: PlaceMarkerPopupProps) => {
    const { details, isLoading } = useCatalogMarkerDetails(dataset, naId);

    return (
        <Popup closeButton closeOnClick closeOnEscapeKey>
            <div>
                <PlaceMarkerPopupContent
                    naId={naId}
                    title2={title2}
                    details={details}
                    isLoading={isLoading}
                />
            </div>
        </Popup>
    );
};

export default PlaceMarkerPopup;
