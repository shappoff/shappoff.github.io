'use client'

import React from "react";

import MarkersItemsList  from '@/components/featured/catalogarchivesgov/MarkersItemsList';
import Spinner from "@/components/shared/Spinner";
const Catalogarchivesgov = React.lazy(() => import('@/components/featured/catalogarchivesgov/Catalogarchivesgov'));


const MapWrapper = ({items}: any) => {
    return <React.Suspense fallback={<Spinner />}>
        <Catalogarchivesgov>
            <MarkersItemsList items={items} />
        </Catalogarchivesgov>
    </React.Suspense>
};

export default MapWrapper;
