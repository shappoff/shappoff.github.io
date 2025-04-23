'use client'
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../bocheikovo1943/Bocheikovo1943'), { ssr: false });

const MapApp = () => {
    return <DynamicComponentWithNoSSR />;
};

export default MapApp;
