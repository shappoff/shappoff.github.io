import fs from "fs";
import path from "path";

export const Belarus_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/Belarus_full.json`), 'utf8'));
export const smolensk_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/smolensk_full.json`), 'utf8'));
export const latvia_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/latvia_full.json`), 'utf8'));
export const lithuania_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/lithuania_full.json`), 'utf8'));
export const ukraine_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/ukraine_full.json`), 'utf8'));
export const russia_full = JSON.parse(fs.readFileSync(path.resolve(`public/catalogarchivesgov/russia_full.json`), 'utf8'));


const all = [
    ...Belarus_full,
    ...smolensk_full,
    ...latvia_full,
    ...lithuania_full,
    ...ukraine_full,
    ...russia_full,
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

});

fs.writeFileSync(path.resolve(`public/catalogarchivesgov/all_merged.json`), JSON.stringify(res, null, 4), {
    encoding: 'utf8',
    flag: 'w'
});
