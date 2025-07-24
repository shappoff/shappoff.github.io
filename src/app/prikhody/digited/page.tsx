import {Metadata} from "next";
import fs from "fs";
import {
    digitedFormattedDataPath,
    prikhodyArchivesDataPath,
    prikhodyMainDataPath,
} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";

export const metadata: Metadata = {
    title: 'Оцифрованные дела НИАБ | Карта приходов',
    description: 'Оцифрованные дела НИАБ церквей и костелов Беларуси. Генеалогия. Сохранность',
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        image: '/map-icon.jpg',
        url: 'https://shappoff.github.io/prikhody',
        type: 'website'
    },
    keywords: ['Карта', 'Беларусь', 'Церкви', 'Костелы', 'генеалогия', 'Сохранность'],
    robots: { index: true, follow: true },
    icons: [
        {
            url: '/map-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            rel: 'icon'
        }
    ],

};

export default function PrikhodyMapPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const digitedFormattedData = JSON.parse(fs.readFileSync(digitedFormattedDataPath, 'utf8'));
    const prikhodyArchivesData = JSON.parse(fs.readFileSync(prikhodyArchivesDataPath, 'utf8'));

    const digited: Array<any> = [];
    allPrikhods.forEach((prikhodItem: any) => {
        let isDigited = false;
        let digitedCount = 0;
        const [id,title,np,type,lat,lng,count,atd] = prikhodItem;

        if (prikhodyArchivesData[id]) {
            const archivesArr = prikhodyArchivesData[id];
            archivesArr.map((archiveItem: any) => {
                const [year, title, short, fod] = archiveItem;
                if (fod && short === 'НИАБ') {
                    const [f, o, d] = fod.split('-');
                    if (digitedFormattedData[f]) {
                        if (digitedFormattedData[f][o]) {
                            if (digitedFormattedData[f][o][d]) {
                                isDigited = true;
                                ++digitedCount;
                            }
                        }
                    }

                }
            });
        }
        if (isDigited) {
            digited.push([id,title,np,type,lat,lng,digitedCount,atd]);
        }
    });


    return <>
        <WrapToMarkerClusterGroup items={digited} bounds={false} markerLabel="Оцифровано дел:" />
    </>
}
