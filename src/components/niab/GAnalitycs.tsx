'use client'

import React from "react";
import { sendGAEvent } from '@next/third-parties/google';

const GAnalitycs = ({fond}: any) => {
    React.useEffect(() => {
        fond && sendGAEvent('event', 'search', { fond: `${fond}` });
    }, []);
    return <></>
}

export default GAnalitycs;
