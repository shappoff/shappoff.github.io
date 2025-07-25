'use client'

import dynamic from 'next/dynamic';

import Spinner from "@/components/shared/Spinner";

const Catalogarchivesgov = dynamic(() => import('@/components/featured/catalogarchivesgov/Catalogarchivesgov'), {
    loading: () => <Spinner />, ssr: false
});


const MapWrapper = ({items}: any) => {
    return <Catalogarchivesgov items={items} />
};

export default MapWrapper;
