import type Supercluster from 'supercluster';

import type { ClusterFeature, ClusterPointFeature } from '@/components/shared/leaflet/supercluster';

import { MarkerIndexItem } from '../types';

export type MarkerProperties = {
    naId: string | number;
    title2?: string;
};

export type ClusterProperties = Supercluster.AnyProps;

export type MarkerClusterPoint =
    | ClusterPointFeature<MarkerProperties>
    | ClusterFeature<ClusterProperties>;

export type MarkerClusterFeature = ClusterFeature<ClusterProperties>;
export type MarkerPointFeature = ClusterPointFeature<MarkerProperties>;

/** Tuned for dense WWII aerial coverage over Belarus (~6k points). */
export const CLUSTER_OPTIONS: Supercluster.Options<MarkerProperties, ClusterProperties> = {
    radius: 60,
    maxZoom: 16,
    minZoom: 0,
    minPoints: 2,
};

export const toMarkerIndexItem = (point: MarkerPointFeature): MarkerIndexItem => {
    const [lng, lat] = point.geometry.coordinates;

    return {
        naId: point.properties.naId,
        lat,
        lng,
        title2: point.properties.title2,
    };
};

export const toSuperclusterPoints = (
    items: MarkerIndexItem[],
): Array<ClusterPointFeature<MarkerProperties>> =>
    items.map((item) => ({
        type: 'Feature' as const,
        properties: {
            naId: item.naId,
            title2: item.title2,
        },
        geometry: {
            type: 'Point' as const,
            coordinates: [item.lng, item.lat] as [number, number],
        },
    }));
