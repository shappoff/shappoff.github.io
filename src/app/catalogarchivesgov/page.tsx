import {Metadata} from "next";
import Dynamic from "@/components/catalogarchivesgov/Dynamic";
import fs from "fs";
import {
    all_merged,
} from "@/components/paths";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Карта аэрофотосъемки Беларуси времен ВОВ",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(all_merged, 'utf8'));
    return <Dynamic items={belarusItems}/>;
}
