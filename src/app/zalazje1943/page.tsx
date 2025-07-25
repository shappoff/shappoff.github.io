import {Metadata} from "next";
import DynamicMapApp from "@/components/featured/DynamicMapApp";

const title = "Залазье 1943г., Аэрофотосъёмка.";
const description = "Деревня Залазье 14 октября 1943 г., Толочинский район, Витебская область. Аэрофотосъёмка, NCAP TUGX/0508";
const url = 'https://shappoff.github.io/zalazje1943';

export const metadata: Metadata = {
    title,
    description,
    keywords: ['Беларусь', 'Толочинский район', 'Аэрофотосъёмка', 'Великая Отечественная война', 'Славное', 'Залазье'],
    robots: { index: true, follow: true },
    icons: [
        {
            url: '/map-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            rel: 'icon'
        }
    ],
    openGraph: {
        title,
        description,
        url,
        images: [
            { url: 'https://shappoff.github.io/preview/988_895_zalazje1943.jpg', width: 988, height: 895, type: 'image/jpg' },
            { url: 'https://shappoff.github.io/preview/538_487_zalazje1943.jpg', width: 538, height: 487, type: 'image/jpg' },
        ],
        type: 'website',
    },
};

export default function Zalazje1943Page() {
  return <DynamicMapApp mapKey="zalazje1943" />;
}
