import Prikhody from "@/app/prikhody1/Prikhody";
import fs from "fs";
import {algolia_prikhods} from "@/components/paths";

export default function Layout({ children }: any) {
    const allPrikhods = JSON.parse(fs.readFileSync(algolia_prikhods, 'utf8'));

    return (
        <Prikhody items={allPrikhods}>
            {children}
        </Prikhody>
    )
}
