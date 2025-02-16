export const getNickName = (email?: string) => {
    let emailToParse = '';
    if (email) {
        emailToParse = email;
    } else {
        emailToParse = localStorage.getItem('user');
    }

    const [nickname] = emailToParse ? emailToParse.split('@') : [];
    return nickname ? nickname : 'anonymous';
};


function get(obj: any, propPath: string, defaultValue?: any) {
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
