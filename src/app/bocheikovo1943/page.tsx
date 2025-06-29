import {Metadata} from "next";
import MapApp from "@/app/bocheikovo1943/MapApp";

const title = "Бочейково 4 августа 1943 г., Бешенковичский район";
const description = "Бочейково 4 августа 1943 г., Бешенковичский район, Витебская область. Аэрофотосъемка, NCAP TUGX/0500";
const url = 'https://shappoff.github.io/bocheikovo1943';

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
        images: [
            { url: 'https://shappoff.github.io/preview/400_400_bocheikovo1943.jpg', width: 400, height: 400, type: 'image/jpg' },
            { url: 'https://shappoff.github.io/preview/650_650_bocheikovo1943.jpg', width: 650, height: 650, type: 'image/jpg' },
        ],
        type: 'website',
    },
};

export default function Bocheikovo1943Page() {
  return <MapApp />;
}
