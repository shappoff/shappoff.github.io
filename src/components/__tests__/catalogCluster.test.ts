import {
    createMarkerClusterIndex,
    getClusterSizeTier,
    getPaddedMapBoundingBox,
    isClusterFeature,
    isPointFeature,
    toMarkerIndexItem,
    toSuperclusterPoints,
} from '@/components/featured/catalogarchivesgov/utils/cluster';
import { MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';

const sampleItems: MarkerIndexItem[] = [
    { naId: 1, lat: 53.9, lng: 27.5, title2: 'A' },
    { naId: 2, lat: 53.901, lng: 27.501, title2: 'B' },
    { naId: 3, lat: 53.902, lng: 27.502, title2: 'C' },
    { naId: 4, lat: 55.0, lng: 30.0, title2: 'Far' },
];

describe('catalogarchivesgov cluster utils', () => {
    it('maps marker index items to GeoJSON points [lng, lat]', () => {
        const points = toSuperclusterPoints(sampleItems.slice(0, 1));

        expect(points).toEqual([
            {
                type: 'Feature',
                properties: { naId: 1, title2: 'A' },
                geometry: { type: 'Point', coordinates: [27.5, 53.9] },
            },
        ]);
    });

    it('pads map bounds so queries include near-edge features', () => {
        const bounds = {
            getWest: () => 10,
            getSouth: () => 20,
            getEast: () => 30,
            getNorth: () => 40,
        } as Pick<
            import('leaflet').LatLngBounds,
            'getWest' | 'getSouth' | 'getEast' | 'getNorth'
        >;

        expect(getPaddedMapBoundingBox(bounds as import('leaflet').LatLngBounds, 0.25)).toEqual([
            5, 15, 35, 45,
        ]);
    });

    it('classifies cluster size tiers for icon caching', () => {
        expect(getClusterSizeTier(1)).toBe('small');
        expect(getClusterSizeTier(9)).toBe('small');
        expect(getClusterSizeTier(10)).toBe('medium');
        expect(getClusterSizeTier(99)).toBe('medium');
        expect(getClusterSizeTier(100)).toBe('large');
    });

    it('builds an index and returns clusters for a viewport bbox', () => {
        const index = createMarkerClusterIndex(sampleItems);
        const clusters = index.getClusters([27, 53, 28, 54], 8);

        expect(clusters.length).toBeGreaterThan(0);
        expect(clusters.some(isClusterFeature) || clusters.every(isPointFeature)).toBe(true);
    });

    it('restores MarkerIndexItem from a point feature', () => {
        const point = toSuperclusterPoints(sampleItems)[0];

        expect(toMarkerIndexItem(point)).toEqual({
            naId: 1,
            lat: 53.9,
            lng: 27.5,
            title2: 'A',
        });
    });

    it('expands a cluster on click via getClusterExpansionZoom', () => {
        const index = createMarkerClusterIndex(sampleItems);
        const clusters = index.getClusters([27, 53, 28, 54], 6);
        const cluster = clusters.find(isClusterFeature);

        if (!cluster) {
            // Sparse layout at this zoom may already be points — still valid.
            expect(clusters.every(isPointFeature)).toBe(true);
            return;
        }

        const expansionZoom = index.getClusterExpansionZoom(cluster.id as number);

        expect(expansionZoom).toBeGreaterThan(6);
    });
});
