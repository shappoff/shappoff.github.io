import { DivIcon, type DivIconOptions } from 'leaflet';

const iconCache = new Map<string, DivIcon>();

export const createCachedDivIcon = (cacheKey: string, options: DivIconOptions): DivIcon => {
    if (!iconCache.has(cacheKey)) {
        iconCache.set(cacheKey, new DivIcon(options));
    }

    return iconCache.get(cacheKey)!;
};
