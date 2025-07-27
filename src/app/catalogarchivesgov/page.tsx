import {Metadata} from "next";

import fs from "fs";
import {catalogarchivesgovBelarusPath} from "@/components/paths";
import HomeButton from "@/components/shared/HomeButton";
import MapWrapper from "@/components/featured/catalogarchivesgov/MapWrapper";
import Button from '@mui/material/Button';
import Link from 'next/link'
import Stack from '@mui/material/Stack';

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(catalogarchivesgovBelarusPath, 'utf8'));
    return <>
        <Stack spacing={2} direction="row" sx={{position: 'absolute', top: 0, left: 0, zIndex: 999}}>
            <HomeButton absolute={false} variant={true}/>
            <Link href="/catalogarchivesgov/smolensk">
                <Button
                    variant="contained"
                    size="small"
                >
                    Смоленск
                </Button>
            </Link>
        </Stack>
        <MapWrapper items={belarusItems} />
    </>;
}
