import type { LatLngBounds } from 'leaflet';

import { areClusterSetsEqual, isClusterFeature, isPointFeature } from '../clusterFeatureGuards';
import { getClusterIconSize, getClusterSizeClass } from '../getClusterSizeClass';
import { getMapBoundingBox } from '../getMapBoundingBox';
import type { ClusterOrPointFeature } from '../types';

const createBounds = ({
    west,
    south,
    east,
    north,
}: {
    west: number;
    south: number;
    east: number;
    north: number;
}): LatLngBounds =>
    ({
        getWest: () => west,
        getSouth: () => south,
        getEast: () => east,
        getNorth: () => north,
    }) as LatLngBounds;

describe('getMapBoundingBox', () => {
    it('returns west/south/east/north bbox', () => {
        const bounds = createBounds({ west: 20, south: 50, east: 30, north: 55 });

        expect(getMapBoundingBox(bounds)).toEqual([20, 50, 30, 55]);
    });

    it('expands bbox by paddingRatio', () => {
        const bounds = createBounds({ west: 20, south: 50, east: 30, north: 60 });

        expect(getMapBoundingBox(bounds, 0.1)).toEqual([19, 49, 31, 61]);
    });
});

describe('getClusterSizeClass', () => {
    it('maps counts to official demo buckets', () => {
        expect(getClusterSizeClass(1)).toBe('small');
        expect(getClusterSizeClass(99)).toBe('small');
        expect(getClusterSizeClass(100)).toBe('medium');
        expect(getClusterSizeClass(999)).toBe('medium');
        expect(getClusterSizeClass(1000)).toBe('large');
    });

    it('returns icon sizes per bucket', () => {
        expect(getClusterIconSize('small')).toBe(36);
        expect(getClusterIconSize('medium')).toBe(44);
        expect(getClusterIconSize('large')).toBe(52);
    });
});

describe('cluster feature guards', () => {
    const point: ClusterOrPointFeature<{ id: string }, GeoJSON.GeoJsonProperties> = {
        type: 'Feature',
        properties: { id: 'a' },
        geometry: { type: 'Point', coordinates: [27, 53] },
    };

    const cluster: ClusterOrPointFeature<{ id: string }, GeoJSON.GeoJsonProperties> = {
        type: 'Feature',
        id: 1,
        properties: {
            cluster: true,
            cluster_id: 1,
            point_count: 12,
            point_count_abbreviated: 12,
        },
        geometry: { type: 'Point', coordinates: [27.1, 53.1] },
    };

    it('distinguishes cluster and point features', () => {
        expect(isClusterFeature(cluster)).toBe(true);
        expect(isPointFeature(cluster)).toBe(false);
        expect(isClusterFeature(point)).toBe(false);
        expect(isPointFeature(point)).toBe(true);
    });

    it('detects equal cluster sets by id and position', () => {
        expect(areClusterSetsEqual([point, cluster], [point, cluster])).toBe(true);
        expect(areClusterSetsEqual([point], [cluster])).toBe(false);
        expect(
            areClusterSetsEqual(
                [point],
                [
                    {
                        ...point,
                        geometry: { type: 'Point', coordinates: [28, 54] },
                    },
                ],
            ),
        ).toBe(false);
    });
});
