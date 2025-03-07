import {Metadata} from "next";
import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit: any = new (CyrillicToTranslit as any);
import './atd.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export const metadata: Metadata = {
    title: 'Список АТД Беларуси',
    description: 'Список районов, уездов и поветов Беларуси',
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        image: 'https://cdn4.cdn-telegram.org/file/LEDF-rXjeG2hzZSgfio-6lkyWL1p6J29nfFdc555tpdDjMQyOCPqEVUnHr_gflhCPQrrXnImDX_Hk-dklHzzB5uG6lLVsUMCm7d3ZgYWoznIe_Kv7Pr8BToJL2Fujyy9PjrLp3hbmoI2rCMYcHsY7kcblqBhpJOEEuIaRI2xlZZv27WLld-Ns4wndYSR8Gf33QsXwP42sLUCZ4xf4O_-R2RxXPNw7TNYQQJ3w-4BPVj8pkFNXRME-VCCWT9CFa_J094agR9YITHjkbn6ELiF4wELXvp93ShCqvPUwT1pr9Ys7myYqUwQtlp6u4kci1_Bp3xsBjKOrz0IdlKA7Qi5Hw.jpg',
        url: 'https://shappoff.github.io/prikhody',
        type: 'website'
    },
    keywords: ['Беларусь', 'Церкви', 'Костелы', 'Районы', 'Уезды', 'Поветы'],
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

export default function ATDPage() {
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

    return <List key="prikhody-map">
        {
            Object.keys(atdObj).sort((a: any, b: any) => a.localeCompare(b)).map((atdItem: string, index: number) =>
                <ListItem key={atdItem}>
                    <span>{index + 1}. </span>
                    <a href={`/prikhody1/${atdItem}`}
                       title={`${atdObj[atdItem]}, церкви и костелы`}
                    >
                        <ListItemText primary={`${atdObj[atdItem]}`} />
                    </a>
                </ListItem>
            )
        }
    </List>
}
