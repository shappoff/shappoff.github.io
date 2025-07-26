import fs from "fs";
import path from "path";

export const belarus = JSON.parse(fs.readFileSync(path.resolve(`src/app/catalogarchivesgov/belarus.json`), 'utf8'));
export const all_merged = JSON.parse(fs.readFileSync(path.resolve(`src/app/catalogarchivesgov/all_merged.json`), 'utf8'));

const others = all_merged.filter((element) => {
    const isExist = belarus.find((item) => item.title === element.title && item.title2 === element.title2 && item.naId === element.naId);

    return !isExist;
});

fs.writeFileSync(path.resolve(`public/others.json`), JSON.stringify(others, null, 4), {
    encoding: 'utf8',
    flag: 'w'
});
