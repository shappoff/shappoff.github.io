import path from "path";
import fs from "fs";
import '../pamyat.css';
import {Metadata} from "next";

const books = [
    'tolochinskiy',
    'krupskiy',
    'beshenkovichskiy',
    'berezovskiy',
    'sennenskiy',
];

export async function generateStaticParams() {
    const stPropsArr: Array<any> = [];

    books.forEach((kpId: string) => {
        stPropsArr.push({kpId})
    });

    return stPropsArr;
}

export async function generateMetadata({ params, searchParams }: any, parent: any): Promise<Metadata> {
    const {kpId} = await params;
    const metadataPath = path.resolve(`public/kp/${kpId}/metadata.json`);
    return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));


}

export default async function KPDistrict({params}: any) {
    const {kpId} = await params;
    const pagePath = path.resolve(`public/kp/${kpId}/index.html`);
    const __html = fs.readFileSync(pagePath, 'utf8');

    return (
        <main dangerouslySetInnerHTML={{__html}} />
    );
}
