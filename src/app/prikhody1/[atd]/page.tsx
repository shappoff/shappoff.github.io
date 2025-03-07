import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import WrapToMarkerClusterGroup from "@/app/prikhody1/WrapToMarkerClusterGroup";
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

export async function generateStaticParams() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const atdObj: any = {};
    allPrikhods.forEach(([,,,,,,,atdStr]: any) => {
        if (atdStr) {
            const atdList = atdStr.split('|');
            atdList.forEach((atd: string) => {
                const converted = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
                if (!atdObj[converted]) {
                    atdObj[converted] = atd.trim();
                }
            });
        }
    });
    const stPropsArr: Array<any> = [];
    Object.keys(atdObj).forEach((item: any) => {
        stPropsArr.push({atd: `${item}`});
    })

    return stPropsArr;
}

export async function generateMetadata({ params }: any) {
    const {atd} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const atdObj: any = {};
    allPrikhods.forEach(([,,,,,,,atdStr]: any) => {
        if (atdStr) {
            const atdList = atdStr.split('|');
            atdList.forEach((atd: string) => {
                const converted = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
                if (!atdObj[converted]) {
                    atdObj[converted] = atd.trim();
                }
            });
        }
    });

    const title = atdObj[atd];

    return {
        title: `${title} | Карта приходов`,
        description: `Церкви и костелы ${title}, Карта приходов`,
        icons: [
            {
                url: '/map-icon.svg',
                type: 'image/svg+xml',
                sizes: 'any',
                rel: 'icon'
            }
        ],
    }
}

const FondPage = async ({params}: any) => {
    const {atd} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const atdObj: any = {};
    allPrikhods.forEach(([,,,,,,,atdStr]: any) => {
        if (atdStr) {
            const atdList = atdStr.split('|');
            atdList.forEach((atd: string) => {
                const converted = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
                if (!atdObj[converted]) {
                    atdObj[converted] = atd.trim();
                }
            });
        }
    });
    const items = allPrikhods.filter(([,,,,,,,atdStr]: any) => atdStr && ~cyrillicToTranslit.transform(atdStr.trim(), '_').toLowerCase()?.indexOf(atd));

    return <>
        <WrapToMarkerClusterGroup enable={false} items={items} />
    </>
};

export default FondPage;
