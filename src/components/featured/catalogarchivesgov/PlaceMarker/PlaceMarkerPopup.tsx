'use client';

import {Popup} from 'react-leaflet';

import {EXTERNAL_LINK_REL} from './constants';
import {CatalogArchiveHit, ProductionDate} from './types';

interface PlaceMarkerPopupProps {
    hit: CatalogArchiveHit;
}

const formatProductionDate = ({day, month, year}: ProductionDate): string =>
    [day, month, year].filter(Boolean).join('.');

const PlaceMarkerPopup = ({hit}: PlaceMarkerPopupProps) => {
    const digitalObjects = hit.digitalObjects ?? [];
    const productionDates = hit.productionDates ?? [];

    return (
        <Popup closeButton closeOnClick closeOnEscapeKey>
            <div>
                <div><b>{hit.title2}</b></div>
                <div><b>{hit.title}</b></div>
                <div>
                    <a
                        href={`https://catalog.archives.gov/id/${hit.naId}`}
                        target="_blank"
                        rel={EXTERNAL_LINK_REL}
                    >
                        {`https://catalog.archives.gov/id/${hit.naId}`}
                    </a>
                </div>

                {digitalObjects.length > 0 && (
                    <>
                        <br />
                        {digitalObjects.map(({objectFilename, objectUrl}) => (
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
            </div>
        </Popup>
    );
};

export default PlaceMarkerPopup;
