import {Metadata} from "next";
import MapApp from "@/app/zalazje1943/MapApp";

const title = "Залазье 1943г., Аэрофотосъемка.";
const description = "Деревня Залазье 14 октября 1943 г., Толочинский район, Витебская область. Аэрофотосъемка, NCAP TUGX/0508";

export const metadata: Metadata = {
    title,
    description,
    other: {
        robots: "index, follow",
        charset: "UTF-8",
        url: 'https://shappoff.github.io/zalazje1943',
        image: 'https://shappoff.github.io/preview/zalazje1943.png',
        type: 'website'
    },
    keywords: ['Беларусь', 'Толочинский район', 'Аэрофотосъемка', 'Великая Отечественная война', 'Славное', 'Залазье'],
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
        images: ['https://shappoff.github.io/preview/zalazje1943.png'],
    },
};

export default function Zalazje1943Page() {
  return <MapApp />;
}
