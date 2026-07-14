import {
    isValidCoordinatePair,
    toCoordinate,
} from '@/components/featured/catalogarchivesgov/utils/coordinates';
import { resolveMapHitCoordinates } from '@/components/featured/prikhody/resolveMapHitCoordinates';

describe('coordinates helpers', () => {
    it('parses numeric and string coordinates', () => {
        expect(toCoordinate(53.9)).toBe(53.9);
        expect(toCoordinate('27.5')).toBe(27.5);
        expect(toCoordinate('')).toBeNull();
        expect(toCoordinate(undefined)).toBeNull();
        expect(toCoordinate('abc')).toBeNull();
    });

    it('validates finite coordinate pairs', () => {
        expect(isValidCoordinatePair(53.9, 27.5)).toBe(true);
        expect(isValidCoordinatePair(Number.NaN, 27.5)).toBe(false);
    });
});

describe('resolveMapHitCoordinates', () => {
    it('reads lat/lng from MarkerIndexItem shape', () => {
        expect(resolveMapHitCoordinates({ lat: 53.9, lng: 27.5 })).toEqual([53.9, 27.5]);
    });

    it('reads coords and _geoloc variants', () => {
        expect(resolveMapHitCoordinates({ coords: [53.9, 27.5] })).toEqual([53.9, 27.5]);
        expect(resolveMapHitCoordinates({ _geoloc: { lat: '53.9', lng: '27.5' } })).toEqual([
            53.9,
            27.5,
        ]);
    });

    it('returns null for invalid input', () => {
        expect(resolveMapHitCoordinates(null)).toBeNull();
        expect(resolveMapHitCoordinates({ lat: Number.NaN, lng: 1 })).toBeNull();
    });
});
