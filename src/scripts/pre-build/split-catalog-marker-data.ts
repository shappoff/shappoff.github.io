import fs from 'fs';
import path from 'path';

import {
    catalogarchivesgovBelarusPath,
    catalogarchivesgovSmolenskPath,
} from '@/components/paths';

interface CatalogSourceRecord {
    naId: string | number;
    title?: string;
    title2?: string;
    digitalObjects?: unknown[];
    productionDates?: unknown[];
    _geoloc?: {
        lat?: string | number;
        lng?: string | number;
    };
}

interface MarkerIndexRecord {
    naId: string | number;
    lat: number;
    lng: number;
    title2?: string;
}

interface MarkerDetailsRecord {
    title?: string;
    digitalObjects?: unknown[];
    productionDates?: unknown[];
}

const toCoordinate = (value: string | number | undefined): number | null => {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value).trim());

    return Number.isFinite(parsed) ? parsed : null;
};

const splitCatalogDataset = (sourcePath: string) => {
    const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as CatalogSourceRecord[];
    const index: MarkerIndexRecord[] = [];
    const details: Record<string, MarkerDetailsRecord> = {};

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

    fs.writeFileSync(
        path.join(directory, `${baseName}-index.json`),
        JSON.stringify(index),
        'utf8',
    );
    fs.writeFileSync(
        path.join(directory, `${baseName}-details.json`),
        JSON.stringify(details),
        'utf8',
    );

    console.log(
        `Split ${baseName}: ${index.length} markers → ${baseName}-index.json + ${baseName}-details.json`,
    );
};

export default async function splitCatalogMarkerData() {
    splitCatalogDataset(catalogarchivesgovBelarusPath);
    splitCatalogDataset(catalogarchivesgovSmolenskPath);
}
