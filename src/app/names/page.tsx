import {Metadata} from "next";
import fs from "fs";
import {orthodox_catholicNameDataPath} from "@/components/paths";
import Names, {type NameData} from "@/app/names/Names";

export const metadata: Metadata = {
    title: 'Имена | Православные и Католические',
    description: 'Удобный сервис для подбора неразборчиво написанных имён.'
}

export default function Page(): React.JSX.Element {
    const namesData: NameData[] = JSON.parse(fs.readFileSync(orthodox_catholicNameDataPath, 'utf8'));
    return <Names data={namesData} />
}
