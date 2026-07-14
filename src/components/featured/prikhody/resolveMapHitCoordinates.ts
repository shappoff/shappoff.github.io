import { isValidCoordinatePair } from '@/components/featured/catalogarchivesgov/utils/coordinates';

interface MapHit {
    lat?: number;
    lng?: number;
    coords?: [number, number];
    _geoloc?: {
        lat?: string | number;
        lng?: string | number;
    };
}

const toFiniteNumber = (value: string | number | undefined): number | null => {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value));

    return Number.isFinite(parsed) ? parsed : null;
};

export const resolveMapHitCoordinates = (item: unknown): [number, number] | null => {
    if (item == null) {
        return null;
    }

    if (Array.isArray(item) && item.length) {
        const [, , , , lat, lng] = item;

        if (typeof lat === 'number' && typeof lng === 'number' && isValidCoordinatePair(lat, lng)) {
            return [lat, lng];
        }

        return null;
    }

    if (typeof item !== 'object') {
        return null;
    }

    const hit = item as MapHit;

    if (typeof hit.lat === 'number' && typeof hit.lng === 'number') {
        return isValidCoordinatePair(hit.lat, hit.lng) ? [hit.lat, hit.lng] : null;
    }

    if (hit.coords?.length === 2) {
        const [lat, lng] = hit.coords;
        return isValidCoordinatePair(lat, lng) ? [lat, lng] : null;
    }

    const lat = toFiniteNumber(hit._geoloc?.lat);
    const lng = toFiniteNumber(hit._geoloc?.lng);

    if (lat !== null && lng !== null && isValidCoordinatePair(lat, lng)) {
        return [lat, lng];
    }

    return null;
};
