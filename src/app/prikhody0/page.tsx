import {Metadata} from "next";
import Prikhody from "@/app/prikhody0/Prikhody";

export const metadata: Metadata = {
    title: 'Карта приходов',
    description: 'Карта церквей и костелов Беларуси. Генеалогия. Сохранность',
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        image: 'https://cdn4.cdn-telegram.org/file/LEDF-rXjeG2hzZSgfio-6lkyWL1p6J29nfFdc555tpdDjMQyOCPqEVUnHr_gflhCPQrrXnImDX_Hk-dklHzzB5uG6lLVsUMCm7d3ZgYWoznIe_Kv7Pr8BToJL2Fujyy9PjrLp3hbmoI2rCMYcHsY7kcblqBhpJOEEuIaRI2xlZZv27WLld-Ns4wndYSR8Gf33QsXwP42sLUCZ4xf4O_-R2RxXPNw7TNYQQJ3w-4BPVj8pkFNXRME-VCCWT9CFa_J094agR9YITHjkbn6ELiF4wELXvp93ShCqvPUwT1pr9Ys7myYqUwQtlp6u4kci1_Bp3xsBjKOrz0IdlKA7Qi5Hw.jpg',
        url: 'https://shappoff.github.io/prikhody',
        type: 'website'
    },
    keywords: ['Карта', 'Беларусь', 'Церкви', 'Костелы', 'генеалогия', 'Сохранность'],
    robots: { index: true, follow: true },
    icons: [
        {
            url: '/map-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            rel: 'icon'
        }
    ],

};

export default function PrikhodyMapPage() {
    return <Prikhody />
}
