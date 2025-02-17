import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
