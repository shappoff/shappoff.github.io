import {Metadata} from "next";
import MapApp from "@/app/zalazje1943/MapApp";

const title = "Залазье 1943г., Аэрофотосъемка.";
const description = "Деревня Залазье 14 октября 1943 г., Толочинский район, Витебская область. Аэрофотосъемка, NCAP TUGX/0508";
const url = 'https://shappoff.github.io/zalazje1943';

export const metadata: Metadata = {
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
        url,
        images: [{
            url: 'https://shappoff.github.io/preview/zalazje1943.jpg', width: 1200, height: 630, type: 'image/jpg',
        }],
        type: 'website',
    },
};

export default function Zalazje1943Page() {
  return <MapApp />;
}
