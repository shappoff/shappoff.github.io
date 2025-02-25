import fs from "fs";
import path from "path";
import {getGoogleSheetsData} from "@/components/gsheets";

async function saveData(range: string, spreadsheetId: string, path: string) {
    const dataDataValues = await getGoogleSheetsData(range, spreadsheetId) || [];
    fs.writeFileSync(path, JSON.stringify(dataDataValues.filter((v: any) => v.length), null, 4), {encoding: 'utf8', flag: 'w'});
}

export default async function UpdatedPage() {
    await saveData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE', path.resolve(`public/niab/data.json`));
    await saveData('main!A1:L', '1iFNV_EWdeMKjYhz-So3a6dv2v64K8VpgDajag-mJIY8', path.resolve(`public/niab/rejected.json`));
    await saveData('Аркуш1!A2:D', '1068s-7o1XZavxaS7ODN1rEoXbswFkxy4174uEg9yPPY', path.resolve(`public/niab/digited.json`));

    return <>updated</>;
}
