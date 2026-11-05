import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shappoff.github.io').replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: [
            `${SITE_URL}/sitemap.xml`,
            `${SITE_URL}/prikhody/sitemap.xml`,
            `${SITE_URL}/catalogarchivesgov/sitemap.xml`,
            `${SITE_URL}/atd/sitemap.xml`,
        ],
        host: SITE_URL,
    }
}
