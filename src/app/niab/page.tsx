import {Metadata} from "next";
import FondyNIABApp from "@/components/niab/FondyNIABApp";
import './NIAB.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getGoogleSheetsData} from "@/components/gsheets";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
    title: "Фонды и описи НИАБ",
    description: "Удобный поиск описей по фондам НИАБ (Национальный исторический архив Беларуси).",
    icons: [
        {
            url: 'niab/favicon.ico',
            type: 'image/x-icon',
            sizes: 'any',
            rel: 'icon'
        }
    ],
    keywords: ['НИАБ', 'Фонды', 'Описи', 'генеалогия', 'Беларусь'],
    referrer: 'origin',
    robots: {index: true, follow: true}

};

async function saveData(range: string, spreadsheetId: string, path: string) {
    const dataDataValues = await getGoogleSheetsData(range, spreadsheetId) || [];
    fs.writeFileSync(path, JSON.stringify(dataDataValues.filter((v: any) => v.length), null, 4), {encoding: 'utf8', flag: 'w'});
}

export default async function NIAB() {
/*
    await saveData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE', path.resolve(`public/niab/data.json`));
    await saveData('main!A1:L', '1iFNV_EWdeMKjYhz-So3a6dv2v64K8VpgDajag-mJIY8', path.resolve(`public/niab/rejected.json`));
    await saveData('Аркуш1!A2:D', '1068s-7o1XZavxaS7ODN1rEoXbswFkxy4174uEg9yPPY', path.resolve(`public/niab/digited.json`));
*/

    return <>
        <FondyNIABApp/>
    </>;
}
