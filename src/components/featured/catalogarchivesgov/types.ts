export type CatalogDataset = 'belarus' | 'smolensk';

export interface MarkerIndexItem {
    naId: string | number;
    lat: number;
    lng: number;
    title2?: string;
}

export interface MarkerDetails {
    title?: string;
    digitalObjects?: {
        objectUrl: string;
        objectFilename: string;
    }[];
    productionDates?: {
        day?: string | number;
        month?: string | number;
        year?: string | number;
    }[];
}
