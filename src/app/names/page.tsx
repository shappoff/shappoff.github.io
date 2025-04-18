import fs from "fs";
import {namesDataPath} from "@/components/paths";
import Names from "@/app/names/Names";

export const metadata =  {
    title: 'Имена | Православные и Католические',
    description: 'Православные имена, Католические имена, Список католических имен, Список православных имен'
}

export default function Page() {
    const namesData = JSON.parse(fs.readFileSync(namesDataPath, 'utf8'));
    return <Names data={namesData} />
}
