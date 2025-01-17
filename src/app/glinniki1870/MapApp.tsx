'use client'
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./Glinniki1870'), { ssr: false });

const MapApp = () => {
    return <DynamicComponentWithNoSSR />;
};

export default MapApp;
