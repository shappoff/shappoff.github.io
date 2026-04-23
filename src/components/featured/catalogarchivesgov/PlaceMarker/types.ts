export interface GeoLocation {
    lat: number;
    lng: number;
}

export interface DigitalObject {
    objectUrl: string;
    objectFilename: string;
}

export interface ProductionDate {
    day?: string | number;
    month?: string | number;
    year?: string | number;
}

export interface CatalogArchiveHit {
    _geoloc?: GeoLocation;
    naId: string | number;
    title2?: string;
    title?: string;
    digitalObjects?: DigitalObject[];
    productionDates?: ProductionDate[];
}

export interface PlaceMarkerProps {
    hit: CatalogArchiveHit;
}
