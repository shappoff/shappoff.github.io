import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

type SitemapPage = {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shappoff.github.io').replace(/\/$/, '');
const LAST_MODIFIED = new Date();

const sitemapPages: SitemapPage[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/zhigalo', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/glinniki1870', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/glinniki1846', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/niab', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/niab/all', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/kp', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/prikhody', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/prikhody/atd', changeFrequency: 'weekly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return sitemapPages.map(({ path, changeFrequency, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency,
        priority,
    }));
}
