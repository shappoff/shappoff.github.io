import {Metadata} from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import {List, ListItem} from "@mui/material";

const targetNIAB = path.resolve(`public/niab/data.json`);

export const metadata: Metadata = {
    title: "Фонды и описи НИАБ",
    description: "Удобный поиск описей по фондам НИАБ (Национальный исторический архив Беларуси).",
    icons: [
        {
            url: '/niab/favicon.ico',
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
    const allPosts = JSON.parse(fs.readFileSync(targetNIAB, 'utf8'));
    return <>
        <List>
            {
                allPosts
                    .filter(([fod]: any) => !!fod)
                    .map((row: any, index: number) => {
                        const [fod, fodFull, fodlink, title, anotation, op, count, lang, oplink, internal, note, years, opNmb, store, storeNote] = row;
                        return <ListItem>
                            <Link key={index} href={`/niab/${fod}`}>{fodFull} {title}</Link>
                        </ListItem>
                    })
            }
        </List>
    </>;
}
