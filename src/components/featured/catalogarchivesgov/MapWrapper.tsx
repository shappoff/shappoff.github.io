'use client'

import dynamic from 'next/dynamic';

const MarkersItemsList = dynamic(() => import('@/components/featured/catalogarchivesgov/MarkersItemsList'), {
    ssr: false, // Ensure this component is only loaded on the client-side
    loading: () => <p>Loading...</p>, // Optional loading state
});
const Catalogarchivesgov = dynamic(() => import('@/components/featured/catalogarchivesgov/Catalogarchivesgov'), {
    ssr: false, // Ensure this component is only loaded on the client-side
    loading: () => <p>Loading...</p>, // Optional loading state
});


const MapWrapper = ({items}: any) => {
    return <Catalogarchivesgov>
        <MarkersItemsList items={items} />
    </Catalogarchivesgov>
};

export default MapWrapper;
