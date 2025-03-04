import {Metadata} from "next";
import Dynamic from "@/components/catalogarchivesgov/Dynamic";
import fs from "fs";
import {Belarus_full, latvia_full, lithuania_full, russia_full, smolensk_full, ukraine_full} from "@/components/paths";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Карта аэрофотосъемки Беларуси времен ВОВ",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(Belarus_full, 'utf8'));
    const smolenskItems = JSON.parse(fs.readFileSync(smolensk_full, 'utf8'));
    const latvia_fullItems = JSON.parse(fs.readFileSync(latvia_full, 'utf8'));
    const lithuania_fullItems = JSON.parse(fs.readFileSync(lithuania_full, 'utf8'));
    const ukraine_fullItems = JSON.parse(fs.readFileSync(ukraine_full, 'utf8'));
    const russia_fullItems = JSON.parse(fs.readFileSync(russia_full, 'utf8'));
    return <Dynamic items={[
        ...belarusItems,
        ...smolenskItems,
        ...latvia_fullItems,
        ...lithuania_fullItems,
        ...ukraine_fullItems,
        ...russia_fullItems,
    ]}/>;
}
