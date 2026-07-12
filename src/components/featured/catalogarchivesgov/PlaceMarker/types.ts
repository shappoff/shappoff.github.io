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

export type { MarkerIndexItem as CatalogArchiveHit } from '../types';
