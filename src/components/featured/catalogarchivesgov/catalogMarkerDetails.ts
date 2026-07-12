import { CatalogDataset, MarkerDetails } from './types';

type DetailsMap = Record<string, MarkerDetails>;

const detailsCache = new Map<CatalogDataset, Promise<DetailsMap>>();

const loadDetailsMap = (dataset: CatalogDataset): Promise<DetailsMap> => {
    if (!detailsCache.has(dataset)) {
        const loader =
            dataset === 'belarus'
                ? import('@/app/catalogarchivesgov/belarus-details.json').then((module) => module.default)
                : import('@/app/catalogarchivesgov/smolensk/smolensk-details.json').then(
                      (module) => module.default,
                  );

        detailsCache.set(dataset, loader as Promise<DetailsMap>);
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
