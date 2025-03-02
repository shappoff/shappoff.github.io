import {Metadata} from "next";
import Dynamic from "@/components/catalogarchivesgov/Dynamic";
import fs from "fs";
import {Belarus_full, smolensk_full} from "@/components/utils";

export const metadata: Metadata = {
    title: "Аэрофотосъемка Беларуси времен ВОВ 1943",
    description: "Аэрофотосъемка Беларуси времен ВОВ 1943",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(Belarus_full, 'utf8'));
    const smolenskItems = JSON.parse(fs.readFileSync(smolensk_full, 'utf8'));
    return <Dynamic items={[...belarusItems, ...smolenskItems]}/>;
}
