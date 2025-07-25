import {Metadata} from "next";
import HomeButton from "@/components/shared/HomeButton";
import React from "react";
import MarkersItemsList from "@/components/featured/catalogarchivesgov/MarkersItemsList";
import fs from "fs";
import {catalogarchivesgovPath} from "@/components/paths";
import Catalogarchivesgov from "@/components/featured/catalogarchivesgov/Catalogarchivesgov";

export const metadata: Metadata = {
    title: "Карта аэрофотосъемки Беларуси времен ВОВ",
    description: "Немецкие аэрофотоснимки Беларуси времен ВОВ. С сайта catalog.archives.gov.",
};

export default function CatalogarchivesgovPage() {
    const belarusItems = JSON.parse(fs.readFileSync(catalogarchivesgovPath, 'utf8'));
    return <>
        <HomeButton absolute={true} variant={true}/>
        <Catalogarchivesgov>
            <MarkersItemsList items={belarusItems} />
        </Catalogarchivesgov>
    </>;
}
