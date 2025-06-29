import {Metadata} from "next";
import fs from "fs";
import {
    digitedFormattedDataPath,
    prikhodyArchivesDataPath,
    prikhodyMainDataPath,
} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/app/prikhody/WrapToMarkerClusterGroup";

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

    const noinfo: Array<any> = [];
    allPrikhods.forEach((prikhodItem: any) => {
        let isDigited = false;
        let digitedCount = 0;
        const [id,title,np,type,lat,lng,count,atd] = prikhodItem;

        if (+count === 0) {
            noinfo.push([id,title,np,type,lat,lng,digitedCount,atd]);
        }
    });


    return <>
        <WrapToMarkerClusterGroup items={noinfo} maxClusterRadius={40} enable={true} bounds={false} markerLabel="Оцифровано дел:" />
    </>
}
