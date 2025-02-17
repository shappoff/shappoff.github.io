import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: '/nextff',
    async redirects() {
        return [
            {
                source: '/novosady',
                destination: 'https://indexby.github.io/novosady/',
                permanent: true,
            },
            {
                source: '/nextff/novosady',
                destination: 'https://indexby.github.io/novosady/',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
