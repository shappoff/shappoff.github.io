import {Metadata} from "next";

import fs from "fs";
import {catalogarchivesgovSmolenskPath} from "@/components/paths";
import HomeButton from "@/components/shared/HomeButton";
import MapWrapper from "@/components/featured/catalogarchivesgov/MapWrapper";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Смоленской области времен ВОВ",
    description: "Немецкие аэрофотоснимки Смоленской области времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(catalogarchivesgovSmolenskPath, 'utf8'));
    return <>
        <HomeButton absolute={true} variant={true}/>
        <MapWrapper items={belarusItems} />
    </>;
}
