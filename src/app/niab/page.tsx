import {Metadata} from "next";
import FondyNIABApp from "@/components/niab/FondyNIABApp";
import './NIAB.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getGoogleSheetsData} from "@/components/gsheets";

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

export default async function NIAB() {
    await getGoogleSheetsData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE');
    return <>
        <FondyNIABApp/>
    </>;
}
