import fs from "fs";
import {prikhodyArchivesDataPath, prikhodyMainDataPath} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/app/prikhody1/WrapToMarkerClusterGroup";
import InfoPage from "./InfoPage";


type Params = {
    prikhod: string;
}

export async function generateStaticParams(): Promise<Params[]> {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    if (!allPrikhods || allPrikhods.length === 0) {
        return [{ prikhod: 'not-found' }];
    }

    return allPrikhods.map(([id]: any) => ({prikhod: id}));
}

export async function generateMetadata({ params }: any) {
    const {prikhod} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    const currentItem = allPrikhods.find((prkhd: any) => prkhd[0] === prikhod);

    return {
        title: `${currentItem[1]} | Карта приходов`,
        description: `Церкви и костелы ${currentItem[1]}, Карта приходов`,
        icons: [
            {
                url: '/map-icon.svg',
                type: 'image/svg+xml',
                sizes: 'any',
                rel: 'icon'
            }
        ],
    }
}

const PrikhodPage = async ({params}: any) => {
    const {prikhod} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const prikhodyArchivesData = JSON.parse(fs.readFileSync(prikhodyArchivesDataPath, 'utf8'));
    const currentItem = allPrikhods.find((prkhd: any) => prkhd[0] === prikhod);

    return <>
        <InfoPage archives={prikhodyArchivesData[prikhod]} />
        <WrapToMarkerClusterGroup enable={false} items={[currentItem]} bounds={false} />
    </>
};

export default PrikhodPage;
