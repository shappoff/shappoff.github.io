import fs from "fs";
import path from "path";

export const Belarus_full = JSON.parse(fs.readFileSync(path.resolve(`./catalog-export-20250726155113.json`), 'utf8'));

const all = [
    ...Belarus_full,
];

const res = all.map((item) => {
    const {scopeAndContentNote, title, digitalObjects, productionDates, naId} = item;

    return {
        scopeAndContentNote,
        title,
        digitalObjects: digitalObjects?.map(({objectUrl, objectFilename}) => ({objectUrl, objectFilename})),
        productionDates,
        naId
    };

}).filter((item) =>
    item.scopeAndContentNote &&
    ~item.scopeAndContentNote?.indexOf(',') &&
    !~item.scopeAndContentNote?.indexOf('Latitude:') &&
    ~item.scopeAndContentNote?.indexOf('-'))
    .map((item) => {
        const [coords, title2] = item.scopeAndContentNote.split('-');
        const [lat, lng] = coords.trim().split(',');
        if (!(lat && lng)) {
            return null
        }
        const _geoloc = {lat: lat.trim(), lng: lng.trim()};
        delete item.scopeAndContentNote;
        return {...item, _geoloc, title2}
    }).filter((item) => !!item);

fs.writeFileSync(path.resolve(`./all_merged.json`), JSON.stringify(res, null, 4), {
    encoding: 'utf8',
    flag: 'w'
});
