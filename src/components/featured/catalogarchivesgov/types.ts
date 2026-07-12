export interface DigitalObject {
    objectUrl: string;
    objectFilename: string;
}

export interface ProductionDate {
    day?: string | number;
    month?: string | number;
    year?: string | number;
}

export interface MarkerIndexItem {
    naId: string | number;
    lat: number;
    lng: number;
    title2?: string;
}

export interface MarkerDetails {
    title?: string;
    digitalObjects?: DigitalObject[];
    productionDates?: ProductionDate[];
}

export type { CatalogDataset } from './catalogDatasets';
