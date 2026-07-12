'use client';

import { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';

import { getCatalogMarkerDetails } from '../catalogMarkerDetails';
import { CatalogDataset, MarkerDetails } from '../types';
import { EXTERNAL_LINK_REL } from './constants';
import { ProductionDate } from './types';

interface PlaceMarkerPopupProps {
    naId: string | number;
    dataset: CatalogDataset;
    title2?: string;
}

const formatProductionDate = ({ day, month, year }: ProductionDate): string =>
    [day, month, year].filter(Boolean).join('.');

const PlaceMarkerPopup = ({ naId, dataset, title2 }: PlaceMarkerPopupProps) => {
    const [details, setDetails] = useState<MarkerDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getCatalogMarkerDetails(dataset, naId)
            .then((loadedDetails) => {
                if (isMounted) {
                    setDetails(loadedDetails);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [dataset, naId]);

    const digitalObjects = details?.digitalObjects ?? [];
    const productionDates = details?.productionDates ?? [];

    return (
        <Popup closeButton closeOnClick closeOnEscapeKey>
            <div>
                {isLoading && <div>Загрузка...</div>}

                {!isLoading && (
                    <>
                        {title2 && (
                            <div>
                                <b>{title2}</b>
                            </div>
                        )}
                        {details?.title && (
                            <div>
                                <b>{details.title}</b>
                            </div>
                        )}
                        <div>
                            <a
                                href={`https://catalog.archives.gov/id/${naId}`}
                                target="_blank"
                                rel={EXTERNAL_LINK_REL}
                            >
                                {`https://catalog.archives.gov/id/${naId}`}
                            </a>
                        </div>

                        {digitalObjects.length > 0 && (
                            <>
                                <br />
                                {digitalObjects.map(({ objectFilename, objectUrl }) => (
                                    <div key={`${objectFilename}-${objectUrl}`}>
                                        <a href={objectUrl} target="_blank" rel={EXTERNAL_LINK_REL}>
                                            {objectFilename}
                                        </a>
                                    </div>
                                ))}
                            </>
                        )}

                        {productionDates.length > 0 && (
                            <>
                                <br />
                                <hr />
                                <footer>
                                    {productionDates.map((dateItem, index) => (
                                        <div key={`${formatProductionDate(dateItem)}-${index}`}>
                                            {formatProductionDate(dateItem)}
                                        </div>
                                    ))}
                                </footer>
                            </>
                        )}
                    </>
                )}
            </div>
        </Popup>
    );
};

export default PlaceMarkerPopup;
