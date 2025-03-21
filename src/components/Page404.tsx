'use client'
import Error from 'next/error'
import React from "react";

const Page404 = () => {
    React.useEffect(() => {
        const {origin, pathname, href, search} = location;
        if (pathname.endsWith('/')) {
            location.href = `${origin}${pathname.slice(0, -1)}${search}`;
        }
        if (pathname === '/novosady') {
            location.href = 'https://indexby.github.io/novosady/';
        }
    }, []);
    return <Error statusCode={404} />;

};

export default Page404;
