// Type for generic object with string keys and unknown values
export type AnyObject = Record<string, unknown>;

export const getNickName = (email?: string | null | undefined) => {
    let emailToParse: string | null | undefined = '';
    if (email) {
        emailToParse = email;
    } else {
        emailToParse = localStorage.getItem('user');
    }

    const [nickname] = emailToParse ? emailToParse.split('@') : [];
    return nickname ? nickname : 'anonymous';
};

export function get<T = unknown>(obj: AnyObject, propPath: string, defaultValue?: T): T | undefined {
    return getPropertyByPath<T>(obj, propPath, defaultValue);
}

function getPropertyByPath<T = unknown>(obj: AnyObject, propPath: string, defaultValue?: T): T | undefined {
    return propPath.split('.').reduce((o: unknown, p: string) => (o && (o as AnyObject)[p]) || defaultValue, obj) as T | undefined;
}

export function isObject(item: unknown): boolean {
    return (item !== null && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep<T extends AnyObject, S extends AnyObject>(target: T, ...sources: S[]): T & S {
    if (!sources.length) return target as T & S;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key] as AnyObject, source[key] as AnyObject);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target as T & S, ...sources as S[]);
}

export function stringToColour(str: string) {
    var hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function copyToClipboard(data: string, callback: (value: void) => void | PromiseLike<void>) {
    try {
        navigator.clipboard.writeText(data.trim()).then(callback);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

export function getNestedArrayValue(digited: Record<string, Record<string, Record<string, unknown>>> | undefined, fond: string, opis: string, delo: string): boolean | null {
    if (!digited) {
        return null;
    }
    if (!digited[fond]) {
        return null;
    }
    if (!digited[fond][opis]) {
        return null;
    }
    if (!digited[fond][opis][delo]) {
        return null;
    }
    return true;
}

export function create_geoloc(lat: string, lng: string) {
    let _geoloc;
    if (lat && lng) {
        _geoloc = {lat: +lat.trim(), lng: +lng.trim()};
    } else {
        _geoloc = {};
    }
    return _geoloc;
}
