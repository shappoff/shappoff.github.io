import { MarkerDetails } from '../types';
import { formatProductionDate } from '../utils/formatProductionDate';
import { EXTERNAL_LINK_REL } from './constants';

interface PlaceMarkerPopupContentProps {
    naId: string | number;
    title2?: string;
    details: MarkerDetails | null;
    isLoading: boolean;
}

const PlaceMarkerPopupContent = ({
    naId,
    title2,
    details,
    isLoading,
}: PlaceMarkerPopupContentProps) => {
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    const digitalObjects = details?.digitalObjects ?? [];
    const productionDates = details?.productionDates ?? [];

    return (
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
    );
};

export default PlaceMarkerPopupContent;
