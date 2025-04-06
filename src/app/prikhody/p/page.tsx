import {Metadata} from "next";
import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";

import './prkhd.css';
import CreatePortalWrapper from "@/components/CreatePortalWrapper";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Список Церквей и Костелов Беларуси',
    description: 'Список Церквей и Костелов Беларуси',
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        image: 'https://cdn4.cdn-telegram.org/file/LEDF-rXjeG2hzZSgfio-6lkyWL1p6J29nfFdc555tpdDjMQyOCPqEVUnHr_gflhCPQrrXnImDX_Hk-dklHzzB5uG6lLVsUMCm7d3ZgYWoznIe_Kv7Pr8BToJL2Fujyy9PjrLp3hbmoI2rCMYcHsY7kcblqBhpJOEEuIaRI2xlZZv27WLld-Ns4wndYSR8Gf33QsXwP42sLUCZ4xf4O_-R2RxXPNw7TNYQQJ3w-4BPVj8pkFNXRME-VCCWT9CFa_J094agR9YITHjkbn6ELiF4wELXvp93ShCqvPUwT1pr9Ys7myYqUwQtlp6u4kci1_Bp3xsBjKOrz0IdlKA7Qi5Hw.jpg',
        url: 'https://shappoff.github.io/prikhody',
        type: 'website'
    },
    keywords: ['Беларусь', 'Церкви', 'Костелы', 'Районы', 'Уезды', 'Поветы'],
    robots: {index: true, follow: true},
    icons: [
        {
            url: '/map-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            rel: 'icon'
        }
    ],

};

export default function PrikhodListPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    return <CreatePortalWrapper id="slide-panel-info">
        <ol key="prikhody-list">
            {
                allPrikhods
                    .sort((a: any, b: any) => a[2].localeCompare(b[2]))
                    .map(([id, title, np, npType, lat, lng, , atdStr]: any, index: number) =>
                        <li key={id}>
                            <Link href={`/prikhody/p/${id}`}
                               title={`${title}`}
                               aria-label={`${title}`}
                            >
                                {`${npType} ${np}, ${title}, ${atdStr?.split('|').join(', ')}`}
                            </Link>
                        </li>
                    )
            }
        </ol>
    </CreatePortalWrapper>
}
