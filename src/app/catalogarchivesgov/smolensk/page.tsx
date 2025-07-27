import {Metadata} from "next";

import fs from "fs";
import {catalogarchivesgovSmolenskPath} from "@/components/paths";
import MarkersItemsList from "@/components/featured/catalogarchivesgov/MarkersItemsList";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Смоленской области времен ВОВ",
    description: "Немецкие аэрофотоснимки Смоленской области времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const smolenskItems = JSON.parse(fs.readFileSync(catalogarchivesgovSmolenskPath, 'utf8'));
    return <MarkersItemsList items={smolenskItems} />
}
