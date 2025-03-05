import Prikhody from "@/app/prikhody1/Prikhody";
import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";

export default function Layout({ children }: any) {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    return (
        <Prikhody items={allPrikhods}>
            {children}
        </Prikhody>
    )
}
