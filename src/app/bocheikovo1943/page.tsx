import {Metadata} from "next";
import MapApp from "@/app/bocheikovo1943/MapApp";

const title = "Залазье 1943г., Аэрофотосъемка.";
const description = "Бочейково 4 августа 1943 г., Бешенковичский район, Витебская область. Аэрофотосъемка, NCAP TUGX/0500";
const url = 'https://shappoff.github.io/zalazje1943';

export const metadata: Metadata = {
    title,
    description,
    keywords: ['Беларусь', 'Бешенковичский район', 'Аэрофотосъемка', 'Великая Отечественная война', 'Бочейково'],
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
        type: 'website',
    },
};

export default function Zalazje1943Page() {
  return <MapApp />;
}
