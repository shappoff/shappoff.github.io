import {Metadata} from "next";

import fs from "fs";
import { CATALOG_DATASETS } from "@/components/featured/catalogarchivesgov/catalogDatasets";
import MarkersItemsList from "@/components/featured/catalogarchivesgov/MarkersItemsList";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Смоленской области времен ВОВ",
    description: "Немецкие аэрофотоснимки Смоленской области времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const smolenskItems = JSON.parse(fs.readFileSync(CATALOG_DATASETS.smolensk.indexPath, 'utf8'));
    return <MarkersItemsList items={smolenskItems} dataset="smolensk" />
}
