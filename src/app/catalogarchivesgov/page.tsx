import {Metadata} from "next";

import fs from "fs";
import { CATALOG_DATASETS } from "@/components/featured/catalogarchivesgov/catalogDatasets";
import MarkersItemsList from "@/components/featured/catalogarchivesgov/MarkersItemsList";


export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(CATALOG_DATASETS.belarus.indexPath, 'utf8'));
    return <MarkersItemsList items={belarusItems} dataset="belarus" />
}
