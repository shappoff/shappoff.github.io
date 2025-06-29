import fs from "fs";
import {orthodox_catholicNameDataPath} from "@/components/paths";
import Names from "@/app/names/Names";

export const metadata =  {
    title: 'Имена | Православные и Католические',
    description: 'Удобный сервис для подбора неразборчиво написанных имён.'
}

export default function Page() {
    const namesData = JSON.parse(fs.readFileSync(orthodox_catholicNameDataPath, 'utf8'));
    return <Names data={namesData} />
}
