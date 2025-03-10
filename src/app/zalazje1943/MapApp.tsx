'use client'
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../zalazje1943/Zalazje1943'), { ssr: false });

const MapApp = () => {
    return <DynamicComponentWithNoSSR />;
};

export default MapApp;
