'use client'

import React from "react";

const Page404 = () => {
    React.useEffect(() => {
        if (location.pathname.endsWith('/')) {
            history.replaceState({}, '', `${location.origin}${location.pathname.slice(0, -1)}${location.search}`)
        }
    }, []);
    return <h1>404 - Page Not Found </h1>

};

export default Page404;
