import fs from "fs";
import path from "path";

export const itemArray = JSON.parse(fs.readFileSync(path.resolve(`public/catalog-export-20250727230309.json`), 'utf8'));

const formaffedArray = itemArray
    .filter((item) =>
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
        return {
            title: item.title,
            digitalObjects: item.digitalObjects,
            productionDates: item.productionDates,
            naId: item.naId,
            _geoloc,
            title2
        }
    })
    .filter((item) => !!item)


fs.writeFileSync(path.resolve(`public/smolensk.json`), JSON.stringify(formaffedArray, null, 4), {
    encoding: 'utf8',
    flag: 'w'
});
