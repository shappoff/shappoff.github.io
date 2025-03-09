import Prikhody from "@/app/prikhody1/Prikhody";
import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import nextConfig from "../../../next.config";

export default function Layout({ children }: any) {

    console.log('next-env.d.ts', nextConfig);
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    return (
        <Prikhody items={allPrikhods}>
                {children}
            </Prikhody>
    )
}
