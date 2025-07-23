'use client'

import dynamic from "next/dynamic";
import React from "react";

const Prikhody = () => {
    const MapApp = React.useMemo(() => dynamic(
        () => import('@/components/featured/prikhody/PrikhodyMapApp'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    return <MapApp key="map-page" />;
};

export default Prikhody;
