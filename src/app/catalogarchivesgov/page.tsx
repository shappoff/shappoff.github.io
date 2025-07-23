import {Metadata} from "next";
import Dynamic from "@/components/featured/catalogarchivesgov/Dynamic";
import fs from "fs";
import {
    all_merged,
} from "@/components/paths";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(all_merged, 'utf8'));
    return <Dynamic items={belarusItems}/>;
}
