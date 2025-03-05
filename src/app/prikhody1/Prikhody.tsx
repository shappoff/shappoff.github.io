'use client'

import dynamic from "next/dynamic";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Prikhody = ({items}: any) => {
    const MapApp = React.useMemo(() => dynamic(
        () => import('./PrikhodyMapApp'),
        {
            loading: () => <Box sx={{ position: 'absolute', top: '50%', right: '50%' }}>
                <CircularProgress />
            </Box>,
            ssr: false
        }
    ), [])
    return <MapApp items={items} key="map-page" />;
};

export default Prikhody;
