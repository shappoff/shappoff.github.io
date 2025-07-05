'use client'

import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

interface GAAnalyticsProps {}

const GAAnalytics: React.FC<GAAnalyticsProps> = (): React.JSX.Element => {
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
