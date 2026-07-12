import {
    catalogarchivesgovBelarusIndexPath,
    catalogarchivesgovBelarusPath,
    catalogarchivesgovSmolenskIndexPath,
    catalogarchivesgovSmolenskPath,
} from '@/components/paths';

export const CATALOG_DATASETS = {
    belarus: {
        sourcePath: catalogarchivesgovBelarusPath,
        indexPath: catalogarchivesgovBelarusIndexPath,
        detailsImport: () => import('@/app/catalogarchivesgov/belarus-details.json'),
    },
    smolensk: {
        sourcePath: catalogarchivesgovSmolenskPath,
        indexPath: catalogarchivesgovSmolenskIndexPath,
        detailsImport: () => import('@/app/catalogarchivesgov/smolensk/smolensk-details.json'),
    },
} as const;

export type CatalogDataset = keyof typeof CATALOG_DATASETS;
