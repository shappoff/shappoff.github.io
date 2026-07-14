export const toCoordinate = (value: string | number | undefined): number | null => {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value).trim());

    return Number.isFinite(parsed) ? parsed : null;
};

export const isValidCoordinatePair = (lat: number, lng: number): boolean =>
    Number.isFinite(lat) && Number.isFinite(lng);
