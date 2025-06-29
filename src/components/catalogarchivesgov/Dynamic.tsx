'use client'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./Catalogarchivesgov'), { ssr: false });

const MapApp = ({items}: any) => {
    return <DynamicComponentWithNoSSR items={items} />;
};

export default MapApp;
