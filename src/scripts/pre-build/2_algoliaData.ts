import fs from "fs";
import algoliasearch from "algoliasearch";
import {
    prikhodyMainDataPath,
} from "@/components/paths";

import {get} from "@/components/utils";

declare const process: any;

const client = algoliasearch(
    process.env.NEXT_PUBLIC_PPFF_ALGOLIA_APPLICATION_ID,
    process.env.PPFF_ALGOLIA_ADMIN_API_KEY
);

const prikhodyAlgoliaIndex = client.initIndex('prikhodyIndex');


export default async function () {
    console.log('Algolia pre-build data update');
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const result = allPrikhods.map((prikhod: Array<any>) => {
        const [objectID, title, pTitle, pType, lat, lng, src, uezd = ''] = prikhod;
        const _geoloc = create_geoloc(lat, lng);

        return ({objectID, title, pTitle, pType, _geoloc, src, atd: uezd.split('|')});
    });

    prikhodyAlgoliaIndex.saveObjects(result).then((value) => {
        console.log('algolia updated taskIDs', value.taskIDs);
        console.log('algolia updated objectIDs.length', value.objectIDs.length);
    }).catch((reason) => {
        console.log('algolia failed', reason);
    });


}

const create_geoloc = (lat: string, lng: string) => {
    let _geoloc;
    if (lat && lng) {
        _geoloc = {lat: +lat.trim(), lng: +lng.trim()};
    } else {
        _geoloc = {};
    }
    return _geoloc;
};


function createDirIfNot(dir: any) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
