import {Metadata} from "next";
import fs from "fs";
import {
    prikhodyMainDataPath,
} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";

export const metadata: Metadata = {
    title: 'Католические приходы | Карта приходов',
    description: 'Католические приходы Беларуси. Генеалогия. Сохранность',
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        image: '/map-icon.jpg',
        url: 'https://shappoff.github.io/prikhody',
        type: 'website'
    },
    keywords: ['Карта', 'Беларусь', 'Костелы', 'генеалогия', 'Сохранность'],
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
        const [id,title,np,type,lat,lng,count,atd] = prikhodItem;

        if (title.toLowerCase().indexOf('церковь') === -1) {
            noinfo.push(prikhodItem);
        }
    });


    return <>
        <WrapToMarkerClusterGroup items={noinfo} maxClusterRadius={130} enable={true} bounds={false} />
    </>
}
