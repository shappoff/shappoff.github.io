import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: false,
    async redirects() {
        return [
            {
                source: '/novosady',
                destination: 'https://indexby.github.io/novosady/',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
