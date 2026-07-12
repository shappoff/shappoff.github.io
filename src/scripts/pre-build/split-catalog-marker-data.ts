import fs from 'fs';
import path from 'path';

import { CATALOG_DATASETS } from '@/components/featured/catalogarchivesgov/catalogDatasets';
import { MarkerDetails, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';
import { toCoordinate } from '@/components/featured/catalogarchivesgov/utils/coordinates';

interface CatalogSourceRecord {
    naId: string | number;
    title?: string;
    title2?: string;
    digitalObjects?: MarkerDetails['digitalObjects'];
    productionDates?: MarkerDetails['productionDates'];
    _geoloc?: {
        lat?: string | number;
        lng?: string | number;
    };
}

const splitCatalogDataset = (sourcePath: string) => {
    const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as CatalogSourceRecord[];
    const index: MarkerIndexItem[] = [];
    const details: Record<string, MarkerDetails> = {};

    source.forEach((item) => {
        const lat = toCoordinate(item._geoloc?.lat);
        const lng = toCoordinate(item._geoloc?.lng);

        if (lat === null || lng === null) {
            return;
        }

        index.push({
            naId: item.naId,
            lat,
            lng,
            title2: item.title2,
        });

        details[String(item.naId)] = {
            title: item.title,
            digitalObjects: item.digitalObjects,
            productionDates: item.productionDates,
        };
    });

    const directory = path.dirname(sourcePath);
    const baseName = path.basename(sourcePath, '.json');

    fs.writeFileSync(path.join(directory, `${baseName}-index.json`), JSON.stringify(index), 'utf8');
    fs.writeFileSync(path.join(directory, `${baseName}-details.json`), JSON.stringify(details), 'utf8');

    console.log(
        `Split ${baseName}: ${index.length} markers → ${baseName}-index.json + ${baseName}-details.json`,
    );
};

export default async function splitCatalogMarkerData() {
    Object.values(CATALOG_DATASETS).forEach(({ sourcePath }) => {
        splitCatalogDataset(sourcePath);
    });
}
