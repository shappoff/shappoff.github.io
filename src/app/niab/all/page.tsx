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
                    .map((row: any, index: number) => {
                        return <ListItem>
                            <Link key={index} href={`/niab/${row.fod}`}>{row.fodFull} {row.title}</Link>
                        </ListItem>
                    })
            }
        </List>
    </>;
}
