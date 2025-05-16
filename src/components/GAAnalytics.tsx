'use client'

import React from 'react';

const GAAnalytics = () => {
    const [ga, setGa] = React.useState<boolean>(true);
    React.useEffect(() => {
        if (~location.href.indexOf('debug')) {
            localStorage.setItem('debug', 'true');
            setGa(false);
        }
        if (localStorage.getItem('debug')) {
            setGa(false);
        }
    }, []);

    return ga ? <GoogleAnalytics gaId="G-BS71TCVL7J" /> : <></>
};

export default GAAnalytics;
