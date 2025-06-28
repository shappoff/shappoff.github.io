import { 
  GetFunction, 
  IsObjectFunction, 
  MergeDeepFunction, 
  GetNestedArrayValueFunction,
  GenericObject,
  GenericArray
} from '../shared/types';

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


export const get: GetFunction = (obj: GenericObject, propPath: string, defaultValue?: any) => {
    return getPropertyByPath(obj, propPath, defaultValue);
}

function getPropertyByPath(obj: GenericObject, propPath: string, defaultValue?: any): any {
    return propPath.split('.').reduce((o, p) => (o && o[p]) || defaultValue, obj);
}

export const isObject: IsObjectFunction = (item: any): boolean => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export const mergeDeep: MergeDeepFunction = (target: GenericObject, ...sources: GenericObject[]): GenericObject => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
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

export const getNestedArrayValue: GetNestedArrayValueFunction = (digited: GenericObject, fond: string, opis: string, delo: string): boolean | null => {

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
    let _geoloc: { lat: number; lng: number } | {};
    if (lat && lng) {
        _geoloc = {lat: +lat.trim(), lng: +lng.trim()};
    } else {
        _geoloc = {};
    }
    return _geoloc;
}
