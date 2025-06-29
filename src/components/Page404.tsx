'use client'

import React from "react";

const Page404 = ({routeList}: any) => {
    React.useLayoutEffect(() => {
        const {origin, pathname, href, search} = location;
        if (pathname.endsWith('/') && routeList.some((route: string) => pathname.endsWith(`${route}/`))) {
            location.replace(`${origin}${pathname.slice(0, -1)}${search}`);
        }
        if (pathname === '/novosady') {
            location.href = 'https://indexby.github.io/novosady/';
        }
    });

    return <></>;
};

export default Page404;
