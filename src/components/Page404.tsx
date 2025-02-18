'use client'
import Error from 'next/error'
import React from "react";

const Page404 = () => {
    React.useEffect(() => {
        if (location.pathname.endsWith('/')) {
            history.pushState({}, '', `${location.origin}${location.pathname.slice(0, -1)}${location.search}`)
        }
    }, []);
    return <Error statusCode={404} />;

};

export default Page404;
