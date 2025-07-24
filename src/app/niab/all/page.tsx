import {Metadata} from "next";
import fs from "fs";
import Link from "next/link";
import {List, ListItem} from "@mui/material";
import {mainFODDataPath} from "@/components/paths";

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
    const allPosts = JSON.parse(fs.readFileSync(mainFODDataPath, 'utf8'));
    return <List key="List-all">
        {
            allPosts
                .map((row: any, index: number) => {
                    const title = `НИАБ ${row.fodFull || `Фонд ${row.fod},`} ${row.title}`;
                    return <ListItem key={index}>
                        <Link href={`/niab/${row.fod}`}
                              title={title}
                              aria-label={title}>{title}</Link>
                    </ListItem>
                })
        }
    </List>
}
