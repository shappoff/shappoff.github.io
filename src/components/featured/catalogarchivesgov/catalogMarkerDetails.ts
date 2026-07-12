import { CatalogDataset, MarkerDetails } from './types';
import { CATALOG_DATASETS } from './catalogDatasets';

type DetailsMap = Record<string, MarkerDetails>;

const detailsCache = new Map<CatalogDataset, Promise<DetailsMap>>();

const loadDetailsMap = (dataset: CatalogDataset): Promise<DetailsMap> => {
    if (!detailsCache.has(dataset)) {
        const loader = CATALOG_DATASETS[dataset]
            .detailsImport()
            .then((module) => module.default as DetailsMap);

        detailsCache.set(dataset, loader);
    }

    return detailsCache.get(dataset)!;
};

export const getCatalogMarkerDetails = async (
    dataset: CatalogDataset,
    naId: string | number,
): Promise<MarkerDetails | null> => {
    const detailsMap = await loadDetailsMap(dataset);

    return detailsMap[String(naId)] ?? null;
};
