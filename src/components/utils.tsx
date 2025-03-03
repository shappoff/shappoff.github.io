import path from "path";

export const digitedPath = path.resolve(`public/niab/digited.json`);
export const stat333Path = path.resolve(`public/niab/333-9.json`);
export const rejectedPath = path.resolve(`public/niab/rejected.json`);
export const mainDataPath = path.resolve(`public/niab/data.json`);
export const Belarus_full = path.resolve(`public/catalogarchivesgov/Belarus_full.json`);
export const cgia_19_127Path = path.resolve(`public/cgia_19_127.json`);
export const smolensk_full = path.resolve(`public/catalogarchivesgov/smolensk_full.json`);
export const latvia_full = path.resolve(`public/catalogarchivesgov/latvia_full.json`);
export const lithuania_full = path.resolve(`public/catalogarchivesgov/lithuania_full.json`);
export const ukraine_full = path.resolve(`public/catalogarchivesgov/ukraine_full.json`);
export const russia_full = path.resolve(`public/catalogarchivesgov/russia_full.json`);


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


export function get(obj: any, propPath: string, defaultValue?: any) {
    return getPropertyByPath(obj, propPath, defaultValue);
}

function getPropertyByPath(obj: any, propPath: string, defaultValue?: any) {
    return propPath.split('.').reduce((o, p) => (o && o[p]) || defaultValue, obj);
}

export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target: any, ...sources: any) {
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
