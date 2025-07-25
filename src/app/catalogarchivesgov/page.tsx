import {Metadata} from "next";

import fs from "fs";
import {catalogarchivesgovPath} from "@/components/paths";
import HomeButton from "@/components/shared/HomeButton";
import MapWrapper from "@/components/featured/catalogarchivesgov/MapWrapper";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(catalogarchivesgovPath, 'utf8'));
    return <>
        <HomeButton absolute={true} variant={true}/>
        <MapWrapper items={belarusItems} />
    </>;
}
