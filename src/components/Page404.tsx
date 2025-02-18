'use client'
import Error from 'next/error'
import React from "react";

const Page404 = () => {
    React.useEffect(() => {
        if (location.pathname.endsWith('/')) {
            location.href = `${location.origin}${location.pathname.slice(0, -1)}${location.search}`;
        }
        if (location.pathname === '/novosady') {
            location.href = 'https://indexby.github.io/novosady/';
        }
    }, []);
    return <Error statusCode={404} />;

};

export default Page404;
