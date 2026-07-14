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

export type ClusterBBox = [number, number, number, number];

/** Pixel radius relative to tile extent — larger = coarser clusters when zoomed out. */
export const CLUSTER_RADIUS_PX = 60;

/** Zoom at which clusters dissolve into individual points. */
export const CLUSTER_MAX_ZOOM = 16;

/** Extra viewport padding so markers don't pop in/out at the edges while panning. */
export const BBOX_PADDING_RATIO = 0.2;

export const CLUSTER_OPTIONS: Supercluster.Options<MarkerProperties, ClusterProperties> = {
    radius: CLUSTER_RADIUS_PX,
    maxZoom: CLUSTER_MAX_ZOOM,
    minZoom: 0,
    minPoints: 2,
    extent: 512,
    nodeSize: 64,
};

export const isClusterFeature = (point: MarkerClusterPoint): point is MarkerClusterFeature =>
    Boolean(point.properties) &&
    'cluster' in point.properties &&
    point.properties.cluster === true;

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

export const getMapBoundingBox = (bounds: LatLngBounds): ClusterBBox => [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
];

/**
 * Expand the visible bounds so getClusters() returns near-edge features
 * before they enter the viewport (reduces visual flicker while panning).
 */
export const getPaddedMapBoundingBox = (
    bounds: LatLngBounds,
    paddingRatio: number = BBOX_PADDING_RATIO,
): ClusterBBox => {
    const west = bounds.getWest();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const north = bounds.getNorth();
    const latPad = (north - south) * paddingRatio;
    const lngPad = (east - west) * paddingRatio;

    return [west - lngPad, south - latPad, east + lngPad, north + latPad];
};

export const createMarkerClusterIndex = (items: MarkerIndexItem[]) => {
    const clusterIndex = new Supercluster(CLUSTER_OPTIONS);
    clusterIndex.load(toSuperclusterPoints(items));

    return clusterIndex;
};

export type ClusterSizeTier = 'small' | 'medium' | 'large';

export const getClusterSizeTier = (pointCount: number): ClusterSizeTier => {
    if (pointCount < 10) {
        return 'small';
    }

    if (pointCount < 100) {
        return 'medium';
    }

    return 'large';
};
