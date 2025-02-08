import path from "path";
import fs from "fs";
import '../pamyat.css';

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


export default async function KPDistrict({params}: any) {
    const {kpId} = await params;
    const pagePath = path.resolve(`public/kp/${kpId}/index.html`);
    const __html = fs.readFileSync(pagePath, 'utf8');

    return (
        <main dangerouslySetInnerHTML={{__html}} />
    );
}
