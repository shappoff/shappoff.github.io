import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';

export const dynamic = 'force-static';

type SitemapPage = {
    path: string;
    sourcePaths: string[];
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shappoff.github.io').replace(/\/$/, '');

function getLastModifiedFromGit(sourcePaths: string[]): Date | undefined {
    try {
        const dateFromGit = execFileSync(
            'git',
            ['log', '-1', '--format=%cI', '--', ...sourcePaths],
            { encoding: 'utf8' },
        ).trim();

        if (!dateFromGit) {
            return undefined;
        }

        const parsedDate = new Date(dateFromGit);

        if (Number.isNaN(parsedDate.getTime())) {
            return undefined;
        }

        return parsedDate;
    } catch {
        return undefined;
    }
}

const sitemapPages: SitemapPage[] = [
    {
        path: '/',
        sourcePaths: ['src/app/page.tsx'],
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        path: '/zhigalo/',
        sourcePaths: ['src/app/zhigalo/page.tsx'],
        changeFrequency: 'monthly',
        priority: 0.9,
    },
    {
        path: '/glinniki1870',
        sourcePaths: ['src/app/glinniki1870/page.tsx'],
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        path: '/glinniki1846',
        sourcePaths: ['src/app/glinniki1846/page.tsx'],
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        path: '/niab',
        sourcePaths: ['src/app/niab/page.tsx'],
        changeFrequency: 'weekly',
        priority: 0.7,
    },
    {
        path: '/niab/all',
        sourcePaths: ['src/app/niab/all/page.tsx'],
        changeFrequency: 'weekly',
        priority: 0.9,
    },
    {
        path: '/kp',
        sourcePaths: ['src/app/kp/page.tsx', 'src/app/kp/[kpId]/page.tsx'],
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        path: '/prikhody',
        sourcePaths: ['src/app/prikhody/store'],
        changeFrequency: 'weekly',
        priority: 0.7,
    },
    {
        path: '/prikhody/atd',
        sourcePaths: ['src/app/prikhody/store'],
        changeFrequency: 'weekly',
        priority: 0.7,
    },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return sitemapPages.map(({ path, sourcePaths, changeFrequency, priority }) => {
        const lastModified = getLastModifiedFromGit(sourcePaths);

        return {
            url: `${SITE_URL}${path}`,
            ...(lastModified ? { lastModified } : {}),
            changeFrequency,
            priority,
        };
    });
}
