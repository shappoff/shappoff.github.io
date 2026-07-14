import type { LatLngBounds } from 'leaflet';

export type BoundingBox = [west: number, south: number, east: number, north: number];

/**
 * Converts Leaflet bounds to a Supercluster bbox.
 * Optional paddingRatio expands the box to reduce pop-in at viewport edges.
 */
export const getMapBoundingBox = (
    bounds: LatLngBounds,
    paddingRatio = 0,
): BoundingBox => {
    const west = bounds.getWest();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const north = bounds.getNorth();

    if (paddingRatio <= 0) {
        return [west, south, east, north];
    }

    const lngPad = (east - west) * paddingRatio;
    const latPad = (north - south) * paddingRatio;

    return [west - lngPad, south - latPad, east + lngPad, north + latPad];
};
