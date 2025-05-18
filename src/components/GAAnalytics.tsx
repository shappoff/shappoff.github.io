'use client'

import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const GAAnalytics = () => {
    const [ga, setGa] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (~location.href.indexOf('debug')) {
            localStorage.setItem('debug', 'true');
            setGa(false);
            return;
        }
        setGa(!Boolean(localStorage.getItem('debug')));
    }, []);

    return ga ? <GoogleAnalytics gaId="G-BS71TCVL7J" /> : <></>
};

export default GAAnalytics;
