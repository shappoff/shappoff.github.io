'use client'

import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import Spinner from "@/components/shared/Spinner";

const Catalogarchivesgov = dynamic(() => import('@/components/featured/catalogarchivesgov/Catalogarchivesgov'), {
    loading: () => <Spinner />, ssr: false
});


const MapWrapper = ({ children }: { children?: ReactNode }) => {
    return <Catalogarchivesgov>{children}</Catalogarchivesgov>
};

export default MapWrapper;
