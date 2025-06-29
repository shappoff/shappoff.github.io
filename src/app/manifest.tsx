import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Шаппо Сергей',
        short_name: 'Шаппо Сергей',
        description: 'Шаппо Сергей',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff'
    }
}
