import type { LatLngBounds } from 'leaflet';
import Supercluster from 'supercluster';

import { MarkerIndexItem } from '../types';

export type MarkerProperties = {
    naId: string | number;
    title2?: string;
};

export type ClusterProperties = {
    cluster: true;
    point_count: number;
    point_count_abbreviated: string | number;
};

export type MarkerClusterPoint =
    | Supercluster.PointFeature<MarkerProperties>
    | Supercluster.ClusterFeature<ClusterProperties>;

export type MarkerClusterFeature = Supercluster.ClusterFeature<ClusterProperties>;
export type MarkerPointFeature = Supercluster.PointFeature<MarkerProperties>;

export const CLUSTER_OPTIONS: Supercluster.Options<MarkerProperties, ClusterProperties> = {
    radius: 60,
    maxZoom: 14,
    minZoom: 0,
};

export const isClusterFeature = (point: MarkerClusterPoint): point is MarkerClusterFeature =>
    'cluster' in point.properties && point.properties.cluster === true;

export const isPointFeature = (point: MarkerClusterPoint): point is MarkerPointFeature =>
    !isClusterFeature(point);

export const toMarkerIndexItem = (point: MarkerPointFeature): MarkerIndexItem => {
    const [lng, lat] = point.geometry.coordinates;

    return {
        naId: point.properties.naId,
        lat,
        lng,
        title2: point.properties.title2,
    };
};

export const toSuperclusterPoints = (items: MarkerIndexItem[]) =>
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

export const getMapBoundingBox = (bounds: LatLngBounds): [number, number, number, number] => [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
];
